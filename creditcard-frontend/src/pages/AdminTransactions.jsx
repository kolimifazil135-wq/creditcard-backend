import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await axios.get(
          "http://127.0.0.1:8000/api/auth/admin/transactions/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactions(response.data);
      } catch (error) {
        console.error("Failed to load transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f24] p-10 text-white">
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 px-4 py-2 bg-gray-700 rounded"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-blue-400 mb-6">
        Transactions 📄
      </h1>

      <table className="w-full bg-[#11182f] rounded-lg">
        <thead>
          <tr className="text-blue-300">
            <th className="p-4">User</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-6 text-center text-gray-400">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((tx, index) => (
              <tr key={index} className="text-center border-t border-gray-700">
                <td className="p-3">{tx.user}</td>
                <td className="p-3">₹{tx.amount}</td>
                <td className="p-3">{tx.status}</td>
                <td className="p-3">
                  {new Date(tx.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
