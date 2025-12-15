import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    card_number: "",
    card_holder: "",
    card_type: "",
    expiry_date: "",
  });

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("access");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/auth/card/add/",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Card Added Successfully 🎉");
    } catch {
      setMessage("Failed to add card ❌");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0a0f24] p-6 flex flex-col items-center rounded-3xl"
      style={{ borderRadius: "25px" }}
    >

      {/* Back Button Left-Aligned */}
      <div className="w-full max-w-[420px] mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-2.5 rounded-xl 
                     bg-gradient-to-r from-gray-700 to-gray-900 
                     text-white font-semibold
                     border border-cyan-400/40
                     hover:shadow-[0_0_15px_cyan]
                     hover:scale-105 transition-all"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Card Container */}
      <div
        className="bg-[#11182f] p-10 rounded-3xl shadow-[0_0_35px_rgba(0,255,255,0.25)] w-[420px]"
      >

        <h2 className="text-3xl font-extrabold text-cyan-300 text-center drop-shadow-[0_0_12px_cyan] mb-6">
          Add New Card 💳
        </h2>

        {message && (
          <p className="text-center text-cyan-300 font-semibold mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            name="card_number"
            placeholder="Card Number"
            onChange={handleChange}
            required
            className="w-full p-3 bg-[#0b1124] text-cyan-200 border border-cyan-500/40 rounded-xl 
                       focus:ring-2 focus:ring-cyan-400 outline-none"
          />

          <input
            type="text"
            name="card_holder"
            placeholder="Card Holder Name"
            onChange={handleChange}
            required
            className="w-full p-3 bg-[#0b1124] text-cyan-200 border border-cyan-500/40 rounded-xl 
                       focus:ring-2 focus:ring-cyan-400 outline-none"
          />

          <select
            name="card_type"
            onChange={handleChange}
            required
            className="w-full p-3 bg-[#0b1124] text-cyan-200 border border-cyan-500/40 rounded-xl 
                       focus:ring-2 focus:ring-cyan-400 outline-none"
          >
            <option value="">Select Card Type</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>

          <input
            type="text"
            name="expiry_date"
            placeholder="MM/YYYY"
            onChange={handleChange}
            required
            className="w-full p-3 bg-[#0b1124] text-cyan-200 border border-cyan-500/40 rounded-xl 
                       focus:ring-2 focus:ring-cyan-400 outline-none"
          />

          {/* UPDATED BUTTON STYLE */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-[#0d1328]
                       bg-gradient-to-r from-cyan-400 to-blue-500
                       hover:shadow-[0_0_20px_cyan]
                       hover:scale-105 transition-all"
          >
            Save Card
          </button>
        </form>
      </div>
    </div>
  );
}
