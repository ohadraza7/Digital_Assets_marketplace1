import { Outlet } from "react-router-dom";
import BuyerNavbar from "./components/BuyerNavbar";

export default function BuyerLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
