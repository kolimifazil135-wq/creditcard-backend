import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ IMPORTANT

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     await axios.post("http://127.0.0.1:8000/api/auth/register/", formData);
      setMessage("Registration successful ✨");

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);

    } catch {
      setMessage("Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f24] flex items-center justify-center overflow-hidden relative">

      {/* Background Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/40 rounded-full blur-[180px] top-[-100px] left-[-50px] animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/40 rounded-full blur-[150px] bottom-[-80px] right-[-100px] animate-pulse" />

      {/* Outer Glow Card */}
      <div className="relative w-[420px] bg-[#0d1328]/80 rounded-2xl p-[2px] shadow-[0_0_25px_rgba(0,255,255,0.4)] animate-borderGlow">

        {/* Inner Card */}
        <div className="rounded-2xl bg-[#11182f] p-8">

          <h2 className="text-3xl font-extrabold text-cyan-300 text-center tracking-wide drop-shadow-[0_0_8px_cyan]">
            Register Account
          </h2>

          <p className="mt-2 text-center text-gray-400 text-sm">
            Join the platform and start your journey 🚀
          </p>

          {message && (
            <div className="mt-4 text-center text-cyan-300 font-semibold">
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">

            {/* Username */}
            <div>
              <label className="text-gray-300 text-sm">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-3 bg-[#0b1124] text-cyan-200 border border-cyan-500/40 rounded-xl
                focus:ring-2 focus:ring-cyan-400 outline-none shadow-[0_0_12px_rgba(0,255,255,0.3)]"
                placeholder="Enter your username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-3 bg-[#0b1124] text-cyan-200 border border-cyan-500/40 rounded-xl
                focus:ring-2 focus:ring-cyan-400 outline-none shadow-[0_0_12px_rgba(0,255,255,0.3)]"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-3 bg-[#0b1124] text-cyan-200 border border-cyan-500/40 rounded-xl
                focus:ring-2 focus:ring-cyan-400 outline-none shadow-[0_0_12px_rgba(0,255,255,0.3)]"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0d1328] font-bold rounded-xl
              hover:scale-105 transition-all duration-300 shadow-[0_0_20px_cyan]"
            >
              Create Account
            </button>
          </form>

          {/* Login Link FIXED */}
          <p className="text-center text-gray-400 mt-5 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-300 hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>

      {/* Border Glow Animation */}
      <style>
        {`
          @keyframes borderGlow {
            0% { box-shadow: 0 0 15px rgba(0, 255, 255, 0.2); }
            50% { box-shadow: 0 0 25px rgba(0, 255, 255, 0.5); }
            100% { box-shadow: 0 0 15px rgba(0, 255, 255, 0.2); }
          }
          .animate-borderGlow {
            animation: borderGlow 3s infinite ease-in-out;
          }
        `}
      </style>

    </div>
  );
}
