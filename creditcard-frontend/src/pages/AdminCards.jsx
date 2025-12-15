import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminCards() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await axios.get(
          "http://127.0.0.1:8000/api/auth/admin/cards/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCards(response.data);
      } catch (error) {
        console.error("Failed to load cards", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f24] p-10 text-white">

      {/* ✅ FIXED BACK BUTTON */}
      <button
        type="button"
        onClick={() => navigate("/admin")}
        className="mb-6 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition"
      >
        ← Back to Admin Dashboard
      </button>

      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        Cards Overview 💳
      </h1>

      <table className="w-full bg-[#11182f] rounded-lg overflow-hidden">
        <thead>
          <tr className="text-yellow-300 border-b border-gray-700">
            <th className="p-4 text-left">User</th>
            <th className="p-4 text-left">Type</th>
            <th className="p-4 text-left">Masked</th>
            <th className="p-4 text-left">Expiry</th>
          </tr>
        </thead>

        <tbody>
          {cards.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-6 text-center text-gray-400">
                No cards found
              </td>
            </tr>
          ) : (
            cards.map((card, index) => (
              <tr
                key={index}
                className="border-t border-gray-700 hover:bg-[#0f1630]"
              >
                <td className="p-3">{card.user}</td>
                <td className="p-3">{card.card_type}</td>
                <td className="p-3">{card.masked_card}</td>
                <td className="p-3">{card.expiry_date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
