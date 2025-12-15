import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
// import Dashboard from "../src/pages/Dashborad";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import SellerDashboard from "./seller/SellerDashboard";
import useAuth from "./hooks/useAuth";
import SellerProtectedRoute from "./middleware/SellerProtectedRoute";
import UploadAssets from "./seller/pages/UploadAssets";
import MyAssets from "./seller/pages/MyAssets";
import Profile from "./seller/pages/Profile";
import Dashboard from "./seller/pages/Dashboard";
import Earning from "./seller/pages/Earning";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="">
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Seller Dashboard (Nested Routes) */}

          <Route
            path="/seller"
            element={
              <SellerProtectedRoute>
                <SellerDashboard />
              </SellerProtectedRoute>
            }
          >
            <Route path="/seller/dashboard" element={<Dashboard />} />
            <Route path="/seller/upload" element={<UploadAssets />} />
            <Route path="/seller/my-assets" element={<MyAssets />} />
            <Route path="/seller/earnings" element={<Earning />} />
            <Route path="/seller/profile" element={<Profile />} />
            {/* <Route
              path="/seller"
              element={<Navigate to="/seller/dashboard" replace />}
            /> */}
          </Route>

          <Route path="*" element={<div>404 - Page not found</div>} />
          {/* </Routes> */}
        </Routes>
      </main>
    </div>
  );
}
