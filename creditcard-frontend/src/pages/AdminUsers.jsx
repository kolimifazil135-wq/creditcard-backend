import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("access");

        const res = await axios.get(
          "http://127.0.0.1:8000/api/auth/admin/users/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(res.data);
      } catch (err) {
        console.error("Error loading users", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f24] p-10 text-white">
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 px-4 py-2 bg-gray-700 rounded-lg"
      >
        ← Back to Admin Dashboard
      </button>

      <h1 className="text-4xl font-bold text-pink-300 mb-6">Manage Users</h1>

      <table className="w-full bg-[#11182f] rounded-xl overflow-hidden">
        <thead>
          <tr className="text-pink-300">
            <th className="p-4">ID</th>
            <th className="p-4">Username</th>
            <th className="p-4">Email</th>
            <th className="p-4">Staff</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-6 text-center text-gray-400">
                No users found
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id} className="text-center border-t border-gray-700">
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.is_staff ? "Yes" : "No"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
