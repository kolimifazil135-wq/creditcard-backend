import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCard from "./pages/AddCard";
import MakePayment from "./pages/MakePayment";
import TransactionHistory from "./pages/TransactionHistory";
import AdminDashboard from "./pages/AdminDashboard";

/* ADMIN PAGES */
import AdminUsers from "./pages/AdminUsers";
import AdminCards from "./pages/AdminCards";
import AdminTransactions from "./pages/AdminTransactions";

/* ROUTE GUARD */
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* ================= AUTH ================= */}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ================= USER ================= */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-card" element={<AddCard />} />
        <Route path="/make-payment" element={<MakePayment />} />
        <Route path="/transactions" element={<TransactionHistory />} />

        {/* ================= ADMIN (PROTECTED) ================= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/cards"
          element={
            <AdminRoute>
              <AdminCards />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/transactions"
          element={
            <AdminRoute>
              <AdminTransactions />
            </AdminRoute>
          }
        />

        {/* ================= 404 ================= */}
        <Route
          path="*"
          element={
            <h1 className="text-white text-center mt-20 text-3xl">
              404 - Page Not Found
            </h1>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
