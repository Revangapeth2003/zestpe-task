import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      alert("Error fetching users");
    }
  };

  // Handle form submission for Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        // Update existing user
        const response = await axios.put(
          `http://localhost:5000/users/${editingUser._id}`,
          { name, dob, email, phone }
        );
        alert(response.data.message);
        setEditingUser(null);
      } else {
        // Create new user
        const response = await axios.post("http://localhost:5000/submit", {
          name,
          dob,
          email,
          phone,
        });
        alert(response.data.message);
      }

      resetForm();
      fetchUsers();
    } catch (error) {
      alert("Error submitting the form");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${id}`);
      alert(response.data.message);
      fetchUsers();
    } catch (error) {
      alert("Error deleting user");
    }
  };

  // Handle edit
  const handleEdit = (user) => {
    setName(user.name);
    setDob(user.dob.split("T")[0]); // Format date for input
    setEmail(user.email);
    setPhone(user.phone);
    setEditingUser(user);
  };

  // Reset form
  const resetForm = () => {
    setName("");
    setDob("");
    setEmail("");
    setPhone("");
    setEditingUser(null);
  };

  // Fetch users on initial render
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mb-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {editingUser ? "Edit User" : "Register Form"}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="Name"
              className="block text-lg font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="Name"
              placeholder="Enter your name"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="DOB"
              className="block text-lg font-medium text-gray-700"
            >
              Date of Birth:
            </label>
            <input
              type="date"
              id="DOB"
              placeholder="Enter your DOB"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="Email"
              className="block text-lg font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="Email"
              placeholder="Enter your email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="PhoneNo"
              className="block text-lg font-medium text-gray-700"
            >
              Phone No:
            </label>
            <input
              type="tel"
              id="PhoneNo"
              placeholder="Enter your phone number"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              pattern="[0-9]*"
              minLength="6"
              maxLength="15"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              {editingUser ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          User List
        </h2>
        {users.length > 0 ? (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
              >
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.phone}</p>
                  <p className="text-sm text-gray-600">
                    {user.dob.split("T")[0]}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No users found</p>
        )}
      </div>
    </div>
  );
};

export default App;
