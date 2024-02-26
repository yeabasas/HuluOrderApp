const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "mtdb",
});
const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "mtdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();
var server = app.listen(9000, function () {
  console.log("Server is running at http://localhost:9000/");
});
conn.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL!");
  }
});

app.get("/user", function (req, res) {
  conn.query("select * from user", function (err, rows, fields) {
    if (err) console.log(err.message);
    else res.send(rows);
  });
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};
const secretKey = generateSecretKey();

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, phone, password } = req.body;
    // Check if username already exists
    const [existingUsers] = await pool.query(
      "SELECT * FROM user WHERE Phone = ?",
      [phone]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashed = bcrypt.hashSync(password, 10);
    // Insert new user
    await pool.query(
      "INSERT INTO user (FirstName,LastName, Phone, Password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, phone, hashed]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Check if the user exists
    const [existingUsers] = await pool.query(
      "SELECT * FROM user WHERE Phone = ?",
      [phone]
    );

    if (existingUsers.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const hashedPasswordFromDatabase = existingUsers[0].Password;

    if (!bcrypt.compareSync(password, hashedPasswordFromDatabase)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: existingUsers[0].ID,
      },
      secretKey
    );
    // Send the token as a response
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
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

app.get("/usersPhone/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await pool.query("SELECT * FROM user WHERE ID = ?", [token]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});
app.get("/users/:token", authenticateToken, async (req, res) => {
  try {
    const decodedToken = req.user;
    const token = decodedToken.userId;
    const user = await pool.query("SELECT * FROM user WHERE ID = ?", [token]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.put("/updatePassword/:token", authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const decodedToken = req.user;
  const token = decodedToken.userId;

  try {
    // Fetch the user from the database using the token
    const [userRows] = await pool.query("SELECT * FROM user WHERE ID = ?", [
      token,
    ]);

    // Check if the user exists
    if (userRows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const hashedPasswordFromDatabase = userRows[0].Password;

    // Check if the provided old password matches the stored hashed password
    if (!bcrypt.compareSync(oldPassword, hashedPasswordFromDatabase)) {
      return res
        .status(400)
        .json({ success: false, message: "Old password is incorrect" });
    } else {
      const hashed = bcrypt.hashSync(newPassword, 10);

      // Update the user's password in the database
      await pool.query("UPDATE user SET Password = ? WHERE ID = ?", [
        hashed,
        token,
      ]);

      res.json({ success: true, message: "Password updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.put("/updateUser/:token", authenticateToken, async (req, res) => {
  const { firstName, lastName, phone } = req.body;

  const decodedToken = req.user;
  const token = decodedToken.userId;

  try {
    // Fetch the user from the database using the token
    const [userRows] = await pool.query("SELECT * FROM user WHERE ID = ?", [
      token,
    ]);

    // Check if the user exists
    if (userRows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const user = userRows[0];

    // Update the user's password in the database
    await pool.query(
      "UPDATE user SET FirstName = ?,LastName = ?, Phone = ? WHERE ID = ?",
      [firstName, lastName, phone, token]
    );

    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/items", (req, res) => {
  conn.query(
    "SELECT * FROM posts WHERE status != 'Hidden' ORDER BY DateModified DESC",
    function (err, rows, fields) {
      if (err) console.log(err.message);
      else res.send(rows);
    }
  );
});
app.get("/itemsPostDetail/:postId", (req, res) => {
  const post_Id= req.params.postId;
  conn.query(
    "SELECT image_filename FROM post_images WHERE post_id = ?",[post_Id],
    function (err, rows, fields) {
      if (err) console.log(err.message);
      else res.send(rows);
    }
  );
});
app.get("/PostDetails/:token", (req, res) => {
  const post_Id= req.params.token;
  conn.query(
    "SELECT posts.ID AS post_id, posts.ItemName, posts.Category, posts.Condition,posts.View,posts.status,posts.userId, posts.Storage, posts.Ram, posts.Color, posts.Sim, posts.Processor, posts.Description, posts.Price, MIN(post_images.image_filename) AS image_filename FROM posts JOIN post_images ON posts.ID = post_images.post_id GROUP BY posts.ID;",
    function (err, rows, fields) {
      if (err) console.log(err.message);
      else {
        console.log(rows)
        res.send(rows);}
    }
  );
});
app.get("/itemsPost", (req, res) => {
  conn.query(
    "SELECT posts.ID AS post_id, posts.ItemName, posts.Category, posts.Condition,posts.View,posts.status,posts.userId, posts.Storage, posts.Ram, posts.Color, posts.Sim, posts.Processor, posts.Description, posts.Price, MIN(post_images.image_filename) AS image_filename FROM posts JOIN post_images ON posts.ID = post_images.post_id GROUP BY posts.ID;",
    function (err, rows, fields) {
      if (err) console.log(err.message);
      else res.send(rows);
    }
  );
});


app.use('/images', express.static(path.join(__dirname, 'images')));
app.get('/getImages/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    // Assuming 'images' is your table name
    const images = await db.query('SELECT filename FROM images WHERE postId = ?', [postId]);

    // Extract filenames from the result
    const filenames = images.map(img => img.filename);

    // Send filenames as a response
    res.json(filenames);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post("/postItem/:userId", authenticateToken, async (req, res) => {
  const decodedToken = req.user;
  const userId = decodedToken.userId;

  try {
    const {
      name,
      categories,
      storage,
      color,
      condition,
      sim,
      ram,
      processor,
      description,
      price,
    } = req.body;

    // Execute the query
    const result = await pool.query(
      `INSERT INTO posts (userId, Category, ItemName, Storage, Color, \`Condition\`, Sim, Ram, Processor, Description, Price)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        categories,
        name,
        storage,
        color,
        condition,
        sim,
        ram,
        processor,
        description,
        price,
      ]
    );
console.log("Result from post: ",result[0].insertId);
    // Check if the insertion was successful
    if (result.affectedRows != 0) {
      console.log("best")
      res.status(201).json({
        message: "Item posted successfully",
        postId: result[0].insertId, // Send the postId back to the frontend
      });
      console.log("bestpost")
    } else {
      res.status(500).json({ message: "Failed to insert into the database" });
    }
  } catch (error) {
    console.error("Error during item posting:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// app.post("/postItem/:userId", authenticateToken, async (req, res) => {
//   const decodedToken = req.user;
//   const token = decodedToken.userId;
//   console.log("boddyyyyy", token);

//   try {
//     const {
//       name,
//       categories,
//       storage,
//       color,
//       condition,
//       sim,
//       ram,
//       processor,
//       description,
//       price,
//     } = req.body;

//     // Execute the query
//     const [posted]=await pool.query(
//       `INSERT INTO posts (userId, Category, ItemName, Storage, Color, \`Condition\`, Sim, Ram, Processor, Description, Price)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         token,
//         categories,
//         name,
//         storage,
//         color,
//         condition,
//         sim,
//         ram,
//         processor,
//         description,
//         price,
//       ]
//     );
//     postId = posted.insertId;

//     res.status(201).json({ message: "Item posted successfully" });
//   } catch (error) {
//     console.error("Error during item posting:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

app.put("/updateView/:postId", async (req, res) => {
  try {
    const { view } = req.body;
    const postId = req.params.postId;

    console.log("viewed", view);
    console.log("postId", postId);
    const viewed = view + 1;
    console.log("viewed viewed", viewed);
    const [itemRow] = await pool.query("SELECT * FROM posts WHERE ID = ?", [
      postId,
    ]);

    if (itemRow.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    await pool.query("UPDATE posts SET View = ? WHERE ID = ?", [
      viewed,
      postId,
    ]);

    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.put("/deletePost/:token/:posted", authenticateToken, async (req, res) => {
  try {
    const decodedToken = req.user;
    const token = decodedToken.userId;
    const postId = req.params.posted;
    console.log("po", postId, "to", token);
    const status = req.query.status;
    const [itemRow] = await pool.query(
      "SELECT * FROM posts WHERE ID = ?  AND userId = ? ",
      [postId, token]
    );
    console.log("itemRow", status);
    if (itemRow.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    await pool.query("UPDATE posts SET status = ? WHERE ID = ?", [
      status,
      postId,
    ]);

    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.put("/RenewPost/:token/:posted", authenticateToken, async (req, res) => {
  try {
    const decodedToken = req.user;
    const token = decodedToken.userId;
    const postId = req.params.posted;
    console.log("po", postId, "to", token);
    const status = req.query.status;
    const dates = Date.now();
    console.log("date", dates);
    const [itemRow] = await pool.query(
      "SELECT * FROM posts WHERE ID = ?  AND userId = ? ",
      [postId, token]
    );
    console.log("itemRow", status);
    if (itemRow.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    await pool.query(
      "UPDATE posts SET status = ?,  DateModified = CURRENT_TIMESTAMP WHERE ID = ?",
      [status, postId]
    );

    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/EditItem/:userId/:postId", authenticateToken, async (req, res) => {
  const decodedToken = req.user;
  const token = decodedToken.userId;
  const userId = req.params.userId;
  const postId = req.params.postId;

  console.log("boddyyyyy", req.body);
  console.log("body", postId);

  try {
    const {
      name,
      storage,
      color,
      condition,
      sim,
      ram,
      processor,
      description,
      price,
    } = req.body;

    // Fetch the item to update
    const [itemRow] = await pool.query("SELECT * FROM posts WHERE ID = ?", [
      postId,
    ]);

    if (itemRow.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    // Execute the query
    await pool.query(
      `UPDATE posts 
       SET userId=?, ItemName=?, Storage=?, Color=?, \`Condition\`=?, Sim=?, Ram=?, Processor=?, Description=?, Price=?
       WHERE ID = ?`,
      [
        token,
        name,
        storage,
        color,
        condition,
        sim,
        ram,
        processor,
        description,
        price,
        postId,
      ]
    );

    res.status(201).json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error during item updating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/order/:userId", authenticateToken, async (req, res) => {
  const decodedToken = req.user;
  const token = decodedToken.userId;

  try {
    const {
      name,
      storage,
      color,
      condition,
      sim,
      ram,
      processor,
      description,
    } = req.body;

    // Execute the query
    await pool.query(
      `INSERT INTO items (userId, ItemName, Storage, Color, \`Condition\`, Sim, Ram, Processor, Description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [token, name, storage, color, condition, sim, ram, processor, description]
    );

    res.status(201).json({ message: "Item posted successfully" });
  } catch (error) {
    console.error("Error during item posting:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const mysqlq = require("mysql2/promise");

// ...

app.post(
  "/send-message/:token/:postId/:receiverId",
  authenticateToken,
  async (req, res) => {
    const decodedToken = req.user;
    const senderId = decodedToken.userId;
    const itemId = req.params.postId;
    const receiverId = req.params.receiverId;
    const message = req.body.message;
    console.log("itemId", itemId);
    if (!message || receiverId === null) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    // Start a transaction
    const conn = await mysqlq.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "mtdb",
    });

    try {
      await conn.beginTransaction();

      // Check if contact exists
      const checkContactSql =
        "SELECT ID FROM contact WHERE itemId = ? AND (senderId = ? OR receiverId = ?)";
      const [existingContact] = await conn.query(checkContactSql, [
        itemId,
        senderId,
        senderId,
      ]);

      let contactId;

      if (existingContact.length > 0) {
        // Contact already exists
        contactId = existingContact[0].ID;
      } else {
        // Insert a new row in the contact table
        const contactSql =
          "INSERT INTO contact (senderId, receiverId, userId, itemId) VALUES (?,?,?,?)";
        const [insertedContact] = await conn.query(contactSql, [
          senderId,
          receiverId,
          senderId,
          itemId,
        ]);
        contactId = insertedContact.insertId;
      }

      // Insert into messages table
      const messagesSql =
        "INSERT INTO messages (sender_id, receiver_id, message, postId) VALUES (?, ?, ?, ?)";
      await conn.query(messagesSql, [senderId, receiverId, message, contactId]);

      // Commit the transaction
      await conn.commit();
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      // Rollback the transaction in case of an error
      await conn.rollback();
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      // Close the connection
      await conn.end();
    }
  }
);

app.get(
  "/contactDetail/:userId/:postId",
  authenticateToken,
  async (req, res) => {
    const decodedToken = req.user;
    const token = decodedToken.userId;
    const postId = req.params.postId;
    console.log(token);

    const userId = req.params.userId;
    const sql = await pool.query(
      "SELECT contact.ID AS contactId, contact.itemId, contact.userId,contact.receiverId,user.ID,user.FirstName FROM contact INNER JOIN user ON user.ID = contact.userId WHERE ((senderId = ? OR receiverId = ?) AND itemId = ?)",
      [token, token, postId]
    );

    if (!sql[0]) {
      return res.status(404).json({ message: "No item found" });
    }
    res.status(200).json(sql[0]);
  }
);

app.get("/contact/:userId", authenticateToken, async (req, res) => {
  const decodedToken = req.user;
  const token = decodedToken.userId;
  console.log(token);

  const userId = req.params.userId;
  const sql = await pool.query(
    "SELECT contact.ID AS contactId, contact.itemId, contact.userId,contact.receiverId,user.ID,user.FirstName FROM contact INNER JOIN user ON user.ID = contact.userId WHERE senderId = ? OR receiverId = ?",
    [token, token]
  );

  if (!sql[0]) {
    return res.status(404).json({ message: "No item found" });
  }
  res.status(200).json(sql[0]);
});

app.get(
  "/message/:token/:postId/:receiverId/:contactId",
  authenticateToken,
  async (req, res) => {
    try {
      const decodedToken = req.user;
      const contactId = req.params.contactId;
      console.log("contactId", contactId);
      const data = await pool.query(
        "SELECT * FROM messages WHERE postId = ? ORDER BY timestamp",
        [contactId]
      );

      if (!data[0]) {
        return res.status(404).json({ message: "No item found" });
      }
      res.status(200).json(data[0]);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving the user profile" });
    }
  }
);
app.get("/message/:token",authenticateToken,async (req, res) => {
    try {
      const decodedToken = req.user;
      const token = decodedToken.userId;
      const isRead = 0;
      console.log("contactId", contactId);
      const data = await pool.query(
        "SELECT * FROM messages WHERE isRead = ? AND (sender_id=? OR receiver_id=?) ORDER BY timestamp",
        [isRead,token,token]
      );

      if (!data[0]) {
        return res.status(404).json({ message: "No item found" });
      }
      res.status(200).json(data[0]);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving the user profile" });
    }
  }
);
// server.js

// const multer = require("multer");


// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/"); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Define a route for file upload
app.post("/upload", upload.array("file", 4), async (req, res) => {
  try {
    const postId = req.body.postId;
    const file = req.files;
    // Access uploaded file information
    const insertPromises = file.map(async (file) => {
      return await pool.query("INSERT INTO post_images (post_id,image_filename) VALUES (?,?)", [
        postId,
        file.filename,
      ]);
    });
    console.log(insertPromises);

    const result = await Promise.all(insertPromises);

    // Check if the insertion was successful
    if (result.affectedRows === 1) {
      res
        .status(200)
        .json({
          message: "File uploaded successfully",
          filename: file.filename,
        });
    } else {
      res.status(500).json({ message: "Failed to insert into the database" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// app.post("/postItem/:userId",authenticateToken, upload.array("image", 4), async (req, res) => {
//   try {
//     const decodedToken = req.user;
//     const userId = decodedToken.userId;

//     const {
//       name,
//       categories,
//       condition,
//       storage,
//       ram,
//       color,
//       sim,
//       processor,
//       description,
//       price,
//     } = req.body;

//     // Check for required fields
//     if (
//       !name ||
//       !categories ||
//       !condition ||
//       !storage ||
//       !processor ||
//       !color ||
//       !ram ||
//       !sim ||
//       !description ||
//       !price
//     ) {
//       return res.status(400).json({ error: "Required fields are not filled" });
//     }
// console.log("files",req.files)
//     // Check if req.files is defined and is an array
//     if (!req.files || !Array.isArray(req.files)) {
//       return res.status(400).json({ error: "No files provided" });
//     }

//     // Insert into posts table
//     const postQuery =
//       "INSERT INTO `posts`(`userId`,`Category`, `ItemName`, `Condition`, `Storage`, `Ram`, `Sim`, `Description`, `Processor`, `Color`,`Price`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//     const postResult = await pool.query(postQuery, [
//       userId,
//       categories,
//       name,
//       condition,
//       storage,
//       ram,
//       sim,
//       description,
//       processor,
//       color,
//       price,
//     ]);

//     const postId = postResult.insertId;
// console.log("postid",postId)
//     // Insert into post_images table
//     const fileInsertPromises = req.files.map(async (file) => {
//       await pool.query(
//         "INSERT INTO post_images (post_id, image_filename) VALUES (?, ?)",
//         [postId, file.filename]
//       );
//     });
//     console.log(fileInsertPromises)
//     // Wait for all file insertions to complete
//     await Promise.all(fileInsertPromises);

//     // Check if the insertion was successful
//     if (result.affectedRows === 1) {
//       res.status(200).json({
//         message: "Item and files uploaded successfully",
//         postId,
//       });
//     } else {
//       res.status(500).json({ message: "Failed to insert into the database" });
//     }
//   } catch (error) {
//     console.error("Error uploading item:", error);
//     res.status(500).json({ error: "Error uploading item" });
//   }
// });


app.get("/postedItems/:token", authenticateToken, async (req, res) => {
  try {
    const decodedToken = req.user;
    const token = decodedToken.userId;
    const data = await pool.query(
      "SELECT * FROM posts WHERE userId = ? AND  status != 'Hidden' ORDER BY DateModified DESC",
      [token]
    );
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.get("/orderedItems/:token", authenticateToken, async (req, res) => {
  try {
    const decodedToken = req.user;
    const token = decodedToken.userId;
    const data = await pool.query("SELECT * FROM items WHERE userId = ?", [
      token,
    ]);
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.get("/deletedItems/:token", authenticateToken, async (req, res) => {
  try {
    const decodedToken = req.user;
    const token = decodedToken.userId;
    const data = await pool.query(
      "SELECT * FROM posts WHERE userId = ? AND status = 'Hidden'",
      [token]
    );
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
}); // Import your MySQL pool instance


app.post("/postItemss/:userId", authenticateToken, upload.array("file", 4), async (req, res) => {
  const decodedToken = req.user;
  const token = decodedToken.userId;
  console.log("boddyyyyy", token);
  const conn = await mysqlq.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "mtdb",
  });
  try {
    const {
      name,
      categories,
      storage,
      color,
      condition,
      sim,
      ram,
      processor,
      description,
      price,
    } = req.body;

    // Access uploaded file information
    const files = req.files || [];
    
    // Execute the query to insert text information
    const post = `INSERT INTO posts (userId, Category, ItemName, Storage, Color, \`Condition\`, Sim, Ram, Processor, Description, Price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
     const [inset] = await conn.query(post,[
        token,
        categories,
        name,
        storage,
        color,
        condition,
        sim,
        ram,
        processor,
        description,
        price,
      ]);
    
      const postId = inset.insertId;
      console.log("post_Id")
    // Execute the query to insert file information
    const insertFilePromises = files.map(async (file) => {
      try {
        const result = await pool.query(
          "INSERT INTO post_images (image_filename, post_id) VALUES (?, ?)",
          [file.filename,postId]
        );

        // Check if the insertion was successful
        if (result.affectedRows !== 1) {
          throw new Error("Failed to insert file into the database");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to insert file into the database");
      }
    });

    await Promise.all(insertFilePromises);

    res.status(201).json({ message: "Item posted successfully" });
  } catch (error) {
    console.error("Error during item posting:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
