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

// GET endpoint to fetch all user data
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data" });
  }
});

// PUT endpoint to update a user by ID
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, dob, email, phone } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, dob, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Error updating user data" });
  }
});

// DELETE endpoint to remove a user by ID
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user data" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
