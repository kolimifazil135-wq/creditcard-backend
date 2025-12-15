import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  useEffect(() => {
    async function loadTransactions() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/auth/transactions/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error("Transaction API returned:", res.data);
          setData([]);
        }
      } catch (err) {
        console.error("Error loading transactions:", err);
        setData([]);
      }
    }

    loadTransactions();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#0a0f24] p-10 text-white">

      {/* 🔙 BACK BUTTON (Same Style as Add Card Page) */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="
            px-6 py-3 rounded-xl 
            bg-gray-800 text-white font-semibold
            border border-purple-400/40
            hover:bg-gray-700 hover:shadow-[0_0_15px_purple]
            transition-all
          "
        >
          ← Back to Dashboard
        </button>
      </div>

      <h1 className="text-4xl font-bold text-blue-300 mb-6">
        Transaction History 📄
      </h1>

      <table className="w-full bg-[#11182f] rounded-xl overflow-hidden shadow-xl">
        <thead>
          <tr className="bg-[#0d1328] text-cyan-300">
            <th className="p-4">ID</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((t) => (
            <tr key={t.id} className="border-b border-gray-700">
              <td className="p-4">{t.id}</td>
              <td className="p-4">{t.amount}</td>
              <td className="p-4 text-green-400">{t.status}</td>
              <td className="p-4">{t.created_at}</td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td className="p-4 text-center text-gray-400" colSpan={4}>
                No Transactions Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}
