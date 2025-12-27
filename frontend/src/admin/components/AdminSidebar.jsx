import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-2">
        <NavLink
          to="/admin"
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          Dashboard Overview
        </NavLink>

        <NavLink
          to="/admin/users"
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          User Management
        </NavLink>

        <NavLink
          to="assets-moderation"
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          Asset Moderation
        </NavLink>

        <NavLink
          to="/admin/reports"
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          Reports & Analytics
        </NavLink>

        <NavLink
          to="/admin/transactions"
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          Transactions
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
