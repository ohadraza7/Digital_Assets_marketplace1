import { Link } from "react-router-dom";

export default function AssetCard({ imageUrl, title }) {
  // console.log(i);
  return (
    <div className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition">
      <img src={imageUrl} alt={title} className="h-40 w-full object-cover" />

      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2">
          Modern Dashboard UI Kit
        </h3>

        <p className="text-xs text-gray-500 mb-3">by CreativeStudio</p>

        <div className="flex items-center justify-between">
          <span className="font-semibold">$18</span>
          <Link
            to="/buyer/asset/1"
            className="text-sm text-green-600 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
