import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        formData
      );

      const { access, refresh, is_superuser } = res.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("is_admin", is_superuser);

      setMessage("Login successful 🚀");

      setTimeout(() => {
        navigate(is_superuser ? "/admin" : "/dashboard");
      }, 500);

    } catch {
      setMessage("Invalid username or password ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-r from-[#2b145e] via-[#0a0f24] to-[#020617]">

      <div className="w-[420px] bg-[#0b1228] rounded-2xl p-8
                      shadow-[0_0_50px_rgba(34,211,238,0.35)]
                      border border-cyan-400/30">

        {/* TITLE */}
        <h2 className="text-4xl font-extrabold text-cyan-300 text-center">
          Login
        </h2>

        <p className="text-center text-gray-400 mt-2 mb-6">
          Welcome back, continue your journey 🚀
        </p>

        {message && (
          <p className="text-center mb-4 font-semibold text-cyan-300">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* USERNAME */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl
                         bg-[#eaf2ff] text-black
                         focus:outline-none
                         focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl
                         bg-[#eaf2ff] text-black
                         focus:outline-none
                         focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-black
                       bg-gradient-to-r from-cyan-400 to-blue-500
                       hover:scale-[1.02] transition
                       shadow-[0_0_25px_rgba(34,211,238,0.6)]"
          >
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-300 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
