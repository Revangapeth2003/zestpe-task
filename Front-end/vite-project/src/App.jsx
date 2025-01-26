import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/submit", {
        name,
        dob,
        email,
        phone,
      });
      alert(response.data.message);

      // Reset input fields after successful submission
      setName("");
      setDob("");
      setEmail("");
      setPhone("");
    } catch (error) {
      alert("Error submitting the form", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Register form
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

          <div className="flex justify-between gap-4">
            <button
              className="w-1/2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Submit
            </button>
            <button
              className="w-1/2 px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="button"
            >
              Fetch
            </button>
          </div>
        </form>
      </div>
      {/* <Fetch /> */}
    </div>
  );
};

export default App;
