import { useState } from "react";
import { Link, Links } from "react-router-dom";
import React from "react";
import {
  FaBars,
  FaBox,
  FaUpload,
  FaImages,
  FaMoneyBill,
  FaUser,
} from "react-icons/fa";

export default function SellerSidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const menus = [
    { title: "Dashboard", icon: <FaBox />, path: "/seller/dashboard" },
    { title: "Upload Asset", icon: <FaUpload />, path: "/seller/upload" },
    { title: "My Assets", icon: <FaImages />, path: "/seller/my-assets" },
    { title: "Earnings", icon: <FaMoneyBill />, path: "/seller/earnings" },
    { title: "Profile", icon: <FaUser />, path: "/seller/profile" },
  ];

  return (
    <div
      className={` sticky top-0 bg-gray-900 text-white h-screen p-1 pt-8 relative duration-300 
        ${isOpen ? "w-40" : "w-12"}`}
    >
      {/* Toggle Button */}
      <FaBars
        className={`absolute   cursor-pointer -right-3 top-9 bg-white text-gray-900 
          rounded-full p-1 border border-gray-300 ${!isOpen && "rotate-90"}`}
        size={25}
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Sidebar Menu */}
      <div className="mt-10 flex flex-col gap-6">
        {menus.map((menu, index) => (
          <Link
            to={menu.path}
            key={index}
            className="flex items-center gap-4 p-2 hover:bg-gray-700 cursor-pointer rounded-md duration-100"
          >
            <span className="text-xl">{menu.icon}</span>

            {/* Title hides on collapse */}
            <span className={`${!isOpen && "hidden"} text-md `}>
              {menu.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
