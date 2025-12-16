import SellerSidebar from "./component/SellerSidebar";
import { Routes, Route, Router, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function SellerDashboard() {
  return (
    <div className="flex min-h-screen  ">
      <SellerSidebar />
      <main className=" flex-1   ">
        <Outlet />
      </main>
    </div>
  );
}
