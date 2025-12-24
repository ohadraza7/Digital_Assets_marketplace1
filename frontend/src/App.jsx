import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

// Seller
import SellerDashboard from "./seller/SellerDashboard";
import Dashboard from "./seller/pages/Dashboard";
import UploadAssets from "./seller/pages/UploadAssets";
import MyAssets from "./seller/pages/MyAssets";
import Earning from "./seller/pages/Earning";
import Profile from "./seller/pages/Profile";

// Buyer
import BuyerLayout from "./buyer/BuyerLayout";
import Home from "./buyer/pages/Home";
import AssetDetails from "./buyer/pages/AssetsDetails";
import MyPurchases from "./buyer/pages/MyPurchases";
import BuyerProfile from "./buyer/pages/Profile";

// Admin
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import UserManagement from "./admin/pages/UserManagement";
import Reports from "./admin/pages/Reports";

// Other
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Routes>
        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* SELLER ROUTES */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["creator"]}>
                <SellerDashboard />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<UploadAssets />} />
          <Route path="my-assets" element={<MyAssets />} />
          <Route path="earnings" element={<Earning />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* BUYER ROUTES */}
        <Route
          path="/buyer"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["buyer"]}>
                <BuyerLayout />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="asset/:id" element={<AssetDetails />} />
          <Route path="purchases" element={<MyPurchases />} />
          <Route path="profile" element={<BuyerProfile />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 404 */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}
