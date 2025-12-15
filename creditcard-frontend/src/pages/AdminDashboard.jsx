import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔐 Clear tokens
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // 🚪 Redirect to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0f24] p-10 text-white relative">

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="absolute top-8 right-10 px-6 py-2 rounded-xl
                   bg-red-500/20 border border-red-500/50
                   text-red-300 font-semibold
                   hover:bg-red-500/30 hover:shadow-[0_0_15px_red]
                   transition-all"
      >
        🚪 Logout
      </button>

      {/* PAGE TITLE */}
      <h1 className="text-5xl font-extrabold text-red-400 drop-shadow-lg mb-10">
        Admin Dashboard 🔧
      </h1>

      {/* GRID CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* MANAGE USERS */}
        <button
          type="button"
          onClick={() => navigate("/admin/users")}
          className="text-left cursor-pointer bg-[#11182f] p-8 rounded-2xl
                     border border-red-500/40
                     hover:shadow-[0_0_25px_red]
                     transition-all"
        >
          <h2 className="text-2xl font-bold text-red-300 mb-2">
            📌 Manage Users
          </h2>
          <p className="text-gray-400">
            View or delete accounts.
          </p>
        </button>

        {/* CARDS OVERVIEW */}
        <button
          type="button"
          onClick={() => navigate("/admin/cards")}
          className="text-left cursor-pointer bg-[#11182f] p-8 rounded-2xl
                     border border-yellow-400/40
                     hover:shadow-[0_0_25px_yellow]
                     transition-all"
        >
          <h2 className="text-2xl font-bold text-yellow-300 mb-2">
            💳 Cards Overview
          </h2>
          <p className="text-gray-400">
            List all stored cards.
          </p>
        </button>

        {/* TRANSACTIONS */}
        <button
          type="button"
          onClick={() => navigate("/admin/transactions")}
          className="text-left cursor-pointer bg-[#11182f] p-8 rounded-2xl
                     border border-blue-400/40
                     hover:shadow-[0_0_25px_blue]
                     transition-all"
        >
          <h2 className="text-2xl font-bold text-blue-300 mb-2">
            📄 Transactions
          </h2>
          <p className="text-gray-400">
            Monitor payments.
          </p>
        </button>

      </div>
    </div>
  );
}
