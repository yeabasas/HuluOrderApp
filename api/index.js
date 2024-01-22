const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const multer = require('multer');
const path = require('path');
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
// server.listen(port, () => {
//   console.log("Server is running on port 8000");
// });

mongoose
  .connect("mongodb+srv://huluorder:huluorder@cluster0.2vo3ezv.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

const User = require("./models/user");
const Order = require("./models/order");
const Items = require("./models/items");
const Message = require("./models/message");

const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "yeabasayehegn@gmail.com",
      pass: "athgcizhzrhcwnuz",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "HuluOrder.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://192.168.1.11:8000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
// Register a new user
// ... existing imports and setup ...
app.get("/message", async (req, res) => {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb+srv://huluorder:huluorder@cluster0.2vo3ezv.mongodb.net/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("messages").findOne({}, function (err, result) {
      if (err) throw err;
      console.log(result.name);
      db.close();
    });
  });
});
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email); // Debugging statement
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Debugging statement to verify data
    console.log("New User Registered:", newUser);

    // Send verification email to the user
    // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("Error during registration:", error); // Debugging statement
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user witht the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

//endpoint to login the user!
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate a token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      secretKey
    );

    res.status(200).json({ token });
    console.log("token", user._id);
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});

app.get("/user-details", async (req, res) => {
  try {
    // Assuming you have middleware to verify the authentication token and set user details in req.user
    const userId = req.user.userId;

    // Fetch user details from the database
    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user details in the response
    res.status(200).json({
      email: userDetails.email,
      // Add other user details as needed
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const authenticateToken = (req, res, next) => {
  // Get the authorization header
  const authHeader = req.headers["authorization"];
  // Extract the token from the header
  const token = authHeader && authHeader.split(" ")[1];

  // If no token is provided, return an unauthorized response
  if (!token) {
    console.log("unauthorized");
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      // Token is not valid, return an unauthorized response
      return res.status(403).json({ message: "Forbidden" });
    }

    // Token is valid, set user details in req.user
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};
app.get("/users/:token", authenticateToken, async (req, res) => {
  // User.find()
  // .then((data)=>res.json(data))
  // .catch(err=>res.send('Error'))
  try {
    const decodedToken = req.user;
    const token = decodedToken.userId;
    const user = await User.findById(token);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});

//endpoint to store all the orders
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    //create a new Order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});

//posting items
const storage = multer.memoryStorage();
// const upload = multer({ limits : 1000000 });

// app.post("/postItem",upload.single('PostImages'), async (req, res) => {
//   console.log('req.image',req.file)
//   try {
//     const {
//       name,
//       condition,
//       storage,
//       ram,
//       color,
//       sim,
//       processor,
//       description,
//       price,
//     } = req.body;
//     const imageData = req.file.buffer.toString('base64');
//     const imageUrl = `data:image/jpeg;base64,${imageData}`;
//     //create an array of product objects from the cart Items

//     //create a new Order
//     const post = new Items({
//       name: name,
//       condition: condition,
//       storage: storage,
//       ram: ram,
//       color: color,
//       sim: sim,
//       processor: processor,
//       description: description,
//       price: price,
//       imageUrl,
//     });

//     await post.save();

//     res.status(200).json({ message: "Order created successfully!" });
//   } catch (error) {
//     console.log("error creating orders", error);
//     res.status(500).json({ message: "Error creating orders" });
//   }
// });
const uploaded = multer({
  limits : 1000000
})

app.post("/schedule/upload",uploaded.single("schedule"),async(req,res)=>{
  await Order.findOneAndUpdate({fileName : "schedule"},{imageUrl: req.body.filename, file : req.file.buffer},{upsert : true}).exec();
  res.status(200).send("Schedule uploaded");
})
//get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

app.get("/itemss", (req, res) => {
  Items.find()
    .then((items) => res.json(items))
    .catch((error) => res.json(error));
});
app.get("/messagee/:token",async (req, res) => {
  try {
    const userId = req.params.userId;
    const { message } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //create a new Message
    const textMessage = new Order({
      user: userId,
      text: message,
    });

    await textMessage.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});
app.get("/messagee", async (req, res) => {
  // try {
  //   const userId = req.params.userId;

  //   const textMessage = await Message.find({ user: userId }).populate("user");

  //   if (!textMessage || textMessage.length === 0) {
  //     return res.status(404).json({ message: "No message found for this user" });
  //   }

  //   res.status(200).json(textMessage);
  // } catch (error) {
  //   res.status(500).json({ message: "Error" });
  // }
  Message.find()
    .then((items) => res.json(items))
    .catch((error) => res.json(error));
});
/**
 * Main server app
 * This index.js file is responsible for all APIs and Socket connections
 */

//libraies
const http = require("http");
const socketIo = require("socket.io");

//DB Models
// const Chat = require("./models/Chat");
// const Broadcast = require("./models/Broadcast");

//Environment Variables
require("dotenv/config");

const server = http.createServer(app); //Create server with express
const io = socketIo(server); //Initialize Socket

//Enabling JSON parser

//DB Connection

/**API Declaration */

//User login API
// app.post("/login", (req, res) => {
//   const query = User.find({ id: req.body.id });
//   query
//     .exec()
//     .then(data => {
//       if (data.length === 0) {
//         const user = new User({
//           name: req.body.name,
//           id: req.body.id,
//           photo: req.body.photo
//         });

//         user
//           .save()
//           .then(data => {
//             res.json(data);
//           })
//           .catch(error => {
//             res.json(error);
//           });
//       } else {
//         res.json(data[0]);
//       }
//     })
//     .catch(error => {
//       res.json(error);
//     });
// });

//User finder API
app.get("/find/:id", (req, res) => {
  const user = User.find({ id: req.params.id });
  user.exec().then((data) => {
    res.json(data[0]);
  });
});

//Active users finder API
app.get("/users/active", (req, res) => {
  const users = User.find({ isActive: true });
  users.exec().then((data) => {
    res.json(data);
  });
});

//Inactive users finder API
app.get("/users/inactive", (req, res) => {
  const users = User.find({ isActive: false });
  users.exec().then((data) => {
    res.json(data);
  });
});

/** Socket Declarations */

var clients = []; //connected clients

// io.on("connection", socket => {
//   console.log("New User Connected");
//   socket.on("storeClientInfo", function(data) {
//     console.log(data.customId + " Connected");
//     //store the new client
//     var clientInfo = new Object();
//     clientInfo.customId = data.customId;
//     clientInfo.clientId = socket.id;
//     clients.push(clientInfo);

//     //update the active status
//     const res = User.updateOne({ id: data.customId }, { isActive: true });
//     res.exec().then(() => {
//       console.log("Activated " + data.customId);

//       //Notify others
//       socket.broadcast.emit("update", "Updated");
//       console.log("emmited");
//     });
//   });

//   socket.on("disconnect", function(data) {
//     for (var i = 0, len = clients.length; i < len; ++i) {
//       var c = clients[i];

//       if (c.clientId == socket.id) {
//         //remove the client
//         clients.splice(i, 1);
//         console.log(c.customId + " Disconnected");

//         //update the active status
//         const res = User.updateOne({ id: c.customId }, { isActive: false });
//         res.exec().then(data => {
//           console.log("Deactivated " + c.customId);

//           //notify others
//           socket.broadcast.emit("update", "Updated");
//         });
//         break;
//       }
//     }
//   });
// });

//Messages Socket
const chatSocket = io.of("/chatsocket");
chatSocket.on("connection", function (socket) {
  //On new message
  socket.on("newMessage", (data) => {
    //Notify the room
    socket.broadcast.emit("incommingMessage", "reload");
  });
});

// io.on("connection",socket=>{
//   console.log("a user connected")
//   socket.on("send_chat",function(data) {
//     console.log(data.customId + " Connected");
//     io.emit("send_chat",data.message)
//   })
// })
//Let the server to listen
// server.listen(port, () => console.log(`Listening on port ${port}`));

// server.js
const passport = require("passport");

// Connect to MongoDB

// Middleware
// app.use(passport.initialize());
// require('./config/passport')(passport);

// Routes
// app.use('/api/users', require('./routes/users'));
app.use("/api/messages", require("./routes/messages"));

// Socket.io
const authenticateTokenn = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user; // Set user details in req.user
    next();
  });
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_chat", async (data,userId) => {
    console.log("Received message:", data);

    
    const message = new Message({
      userId:`${userId}`,
      text: `${data}`,
    });

    try {
      await message.save();

      io.emit("send_chat", { userId, text: data });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Other event handlers...
});


// Start server
server.listen(port, () => console.log(`Server running on port ${port}`));




app.put('/updatePassword/:token',authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // const token = req.headers.authorization.split(' ')[1]; // Extracting the token from headers
  const decodedToken = req.user;
    const token = decodedToken.userId;
  // const decodedToken = jwt.verify(token, 'authToken');
  const userEmail = decodedToken.email; // Adjust this based on your token payload

  try {
    const user = await User.findOne({ email: userEmail });
    // Fetch the user from the database using the token
    // const user = await User.findById(token);
    console.log('user',user);
    // Check if the provided old password matches the stored hashed password
    if(oldPassword !== user.password) {
      return res.status(400).json({ success: false, message: 'Old password is incorrect' });
    }

    // Update the user's password in the database
    user.password = newPassword; // For simplicity, assuming newPassword is already hashed
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
















const imageSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  data: {type: Buffer, required: true},
  contentType: {type: String, required: true},
});

const Image = mongoose.model('Image', imageSchema);


const upload = multer();

app.post('/images', upload.single('image'), async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({success: false, message: 'No file provided.'});
    }
    const image = new Image({
      name: `${uuidv4()}.${req.file.mimetype.split('/')[1]}`,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    try {
      await image.save();
      console.log('image saved',image.name)
    } catch (error) {
      console.log(error);
      return res.status(400).json({success: false, message: error.message});
    }
    return res.status(201).json({
        success: true,
        message: 'Image created successfully.',
        imageName: image.name,
      });
  },
);