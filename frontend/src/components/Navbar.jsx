import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import BuyerNavbar from "../buyer/components/BuyerNavbar";

export default function Navbar() {
  const { user, logout } = useAuth();
  // console.log(user.name);

  return (
    <nav className=" shadow-sm bg-gray-400 ">
      <div className=" mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          {user ? (
            user.role === "buyer" ? (
              <div className="flex justify-evenly align-items-center">
                <Link to="/buyer" className="text-xl font-bold p-3">
                  DigitalMarket
                </Link>
                <BuyerNavbar />
              </div>
            ) : (
              <Link to="/" className="font-semibold text-lg text-indigo-600">
                Digital Assets
              </Link>
            )
          ) : (
            <Link to="/" className="font-semibold text-lg text-indigo-600">
              Digital Assets
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-700">
                Hi, {user.name || user.email}
              </span>
              <button
                onClick={() => {
                  logout();
                }}
                className="btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-700 hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm text-indigo-600 hover:underline"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
