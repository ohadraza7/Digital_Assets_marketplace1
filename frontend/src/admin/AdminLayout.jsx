import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <AdminSidebar />
      </aside>

      {/* MAIN AREA */}

      <main className=" flex-1   ">
        <Outlet />
      </main>
    </div>
  );
}
