// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const dbURI = "mongodb://localhost:27017/ZestPe_Task"; // Replace with your MongoDB Atlas connection string

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define schema for form data
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

// Create model
const UserModel = mongoose.model("User", userSchema);

// POST endpoint to save user data to MongoDB
app.post("/submit", async (req, res) => {
  const { name, dob, email, phone } = req.body;

  try {
    const newUser = new UserModel({ name, dob, email, phone });
    await newUser.save();
    res.status(201).json({ message: "User saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving user data" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
