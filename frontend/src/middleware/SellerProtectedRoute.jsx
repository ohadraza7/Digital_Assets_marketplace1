import React from "react";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
  // here children is SellerDashboard component passed from App.jsx
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role !== "creator") return <Navigate to="/" />; // when creator role is not found set route to home

  return children; // render SellerDashboard component
};

export default SellerProtectedRoute;
