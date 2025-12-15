import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white flex flex-col items-center p-10">

      {/* Header Section */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">

        {/* Neon Title */}
        <h1 className="text-4xl font-extrabold text-cyan-300 drop-shadow-[0_0_10px_cyan]">
          User Dashboard 🚀
        </h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-xl 
                     shadow-[0_0_12px_rgba(255,0,0,0.5)]
                     hover:bg-red-600 hover:scale-105 transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-6xl">

        {/* Add Card */}
        <Link
          to="/add-card"
          className="bg-[#11182f] p-8 rounded-2xl 
                     shadow-[0_0_25px_rgba(0,255,255,0.4)] 
                     hover:scale-105 transition-all"
        >
          <h2 className="text-2xl font-bold text-cyan-300">💳 Add Card</h2>
          <p className="text-gray-400 mt-3">Save credit or debit cards.</p>
        </Link>

        {/* Make Payment */}
        <Link
          to="/make-payment"
          className="bg-[#11182f] p-8 rounded-2xl 
                     shadow-[0_0_25px_rgba(192,96,255,0.4)] 
                     hover:scale-105 transition-all"
        >
          <h2 className="text-2xl font-bold text-purple-300">💸 Make Payment</h2>
          <p className="text-gray-400 mt-3">Pay using saved cards.</p>
        </Link>

        {/* Transactions */}
        <Link
          to="/transactions"
          className="bg-[#11182f] p-8 rounded-2xl 
                     shadow-[0_0_25px_rgba(100,180,255,0.4)] 
                     hover:scale-105 transition-all"
        >
          <h2 className="text-2xl font-bold text-blue-300">📄 Transactions</h2>
          <p className="text-gray-400 mt-3">View payment history.</p>
        </Link>

      </div>
    </div>
  );
}
