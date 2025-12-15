import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Route, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // console.log(login() + " called");
  // console.log(navigate() + " called");
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await login(form.email, form.password);

      setLoading(false);
      const role = localStorage.getItem("role");
      console.log("Role after login:", role);
      if (role === "creator") {
        console.log("Navigating to Creator Dashboard");
        navigate("/seller/dashboard");
        // } else if (role === "buyer") {
        //   navigate("/buyer/dashboard");
        // } else if (role === "admin") {
        //   navigate("/admin");
      } else {
        console.log("Navigating to Home Page");
        navigate("/");
      }
    } catch (error) {
      setErr(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            className="input"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="input"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {err && <div className="text-sm text-red-600">{err}</div>}

          <button className="btn" disabled={loading}>
            {loading ? "Signing..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
