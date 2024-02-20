const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

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

app.post("/postItem/:userId", authenticateToken, async (req, res) => {
  const decodedToken = req.user;
  const token = decodedToken.userId;
  console.log("boddyyyyy", token);

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
    await pool.query(
      `INSERT INTO posts (userId, Category, ItemName, Storage, Color, \`Condition\`, Sim, Ram, Processor, Description, Price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
      ]
    );

    res.status(201).json({ message: "Item posted successfully" });
  } catch (error) {
    console.error("Error during item posting:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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
    console.log("date", dates)
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

    await pool.query("UPDATE posts SET status = ?,  DateModified = CURRENT_TIMESTAMP WHERE ID = ?", [
      status,
      postId,
    ]);

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
      const token = decodedToken.userId;
      const postId = req.params.postId;
      const userId = req.params.userId;
      const receiverId = req.params.receiverId;
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
// server.js

const multer = require("multer");
const fs = require("fs");

// Create a multer storage to store uploaded images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const imageName = req.file.originalname;

    // Insert image data into the database
    pool.query(
      "INSERT INTO images (name, data) VALUES (?, ?)",
      [imageName, imageBuffer],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          res.json({ message: "Image uploaded successfully" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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
});
