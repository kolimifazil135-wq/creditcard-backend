import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MakePayment() {
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access");

  useEffect(() => {
    async function loadCards() {
      try {
        if (!token) {
          setCards([]);
          return;
        }

        const res = await axios.get(
          "http://127.0.0.1:8000/api/auth/card/list/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (Array.isArray(res.data)) {
          setCards(res.data);
          // set default selected card if any
          if (res.data.length > 0) {
            setSelectedCardId(res.data[0].id);
          }
        } else {
          console.error("API returned non-array:", res.data);
          setCards([]);
        }
      } catch (err) {
        console.error("Error loading cards:", err);
        setCards([]);
      }
    }

    loadCards();
  }, [token]);

  const pay = async () => {
    setMessage("");
    if (!token) {
      setMessage("You must be logged in to make a payment ❌");
      return;
    }

    if (!selectedCardId) {
      setMessage("Select a card first ❌");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setMessage("Enter a valid amount ❌");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        amount: amount,
        card_id: selectedCardId,
      };

      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/pay/",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // success from backend
      if (res.status === 201 || res.status === 200) {
        setMessage("Payment Successful 🎉");
        // Optionally navigate to transaction history or refresh cards
        setTimeout(() => {
          navigate("/transactions");
        }, 900);
      } else {
        setMessage("Payment failed ❌");
      }
    } catch (err) {
      console.error("Payment error:", err);
      // Show helpful message if 401
      if (err.response && err.response.status === 401) {
        setMessage("Unauthorized. Please login again ❌");
      } else if (err.response && err.response.data) {
        // show server-provided message if present
        const serverMsg =
          err.response.data.message ||
          err.response.data.error ||
          JSON.stringify(err.response.data);
        setMessage(`Payment failed: ${serverMsg}`);
      } else {
        setMessage("Payment failed: Network or server error ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f24] flex flex-col items-center p-10">
      {/* BACK BUTTON */}
      <div className="w-full max-w-[420px] mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold border border-purple-400/40 hover:shadow-[0_0_15px_purple] hover:scale-105 transition-all"
        >
          ← Back to Dashboard
        </button>
      </div>

      <h1 className="text-4xl font-bold text-purple-300 mb-6">Make Payment 💸</h1>

      <div className="bg-[#11182f] p-8 rounded-2xl w-[420px]">
        {message && (
          <p className="text-center text-purple-300 font-semibold mb-4">
            {message}
          </p>
        )}

        <label className="text-gray-300 font-medium">Select Card</label>
        <select
          value={selectedCardId}
          onChange={(e) => setSelectedCardId(e.target.value)}
          className="w-full p-3 bg-[#0b1124] text-purple-200 rounded-xl mt-2 focus:ring-2 focus:ring-purple-400 outline-none"
        >
          {cards.length > 0 ? (
            cards.map((card) => (
              // ensure card.id exists (backend returns id)
              <option key={card.id} value={card.id}>
                {card.masked_card} — {card.card_holder}
              </option>
            ))
          ) : (
            <option value="">No cards available</option>
          )}
        </select>

        <label className="text-gray-300 mt-4 block">Enter Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 bg-[#0b1124] text-purple-200 rounded-xl mt-2 focus:ring-2 focus:ring-purple-400 outline-none"
          placeholder="Enter amount"
          min="1"
        />

        <button
          className="w-full py-3 mt-5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl font-bold text-[#0d1328] hover:shadow-[0_0_20px_purple] hover:scale-105 transition-all"
          onClick={pay}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
