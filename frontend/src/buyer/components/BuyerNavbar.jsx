import { Link } from "react-router-dom";

export default function BuyerNavbar() {
  return (
    <nav className="px-6 py-4 flex justify-between items-center">
      <div className="flex gap-6 text-sm font-medium">
        <Link to="/buyer" className="hover:text-blue-600">
          Explore
        </Link>
        <Link to="/buyer/purchases" className="hover:text-blue-600">
          My Purchases
        </Link>
        <Link to="/buyer/cart" className="hover:text-blue-600">
          Cart
        </Link>
        <Link to="/buyer/profile" className="hover:text-blue-600">
          Profile
        </Link>
      </div>
    </nav>
  );
}
