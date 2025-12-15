import React from "react";
import { Link } from "react-router-dom";

const assets = [
  {
    id: 1,
    title: "Modern Dashboard UI",
    type: "Image",
    category: "UI Kits",
    price: "$15",
    status: "Approved",
    downloads: 23,
    thumbnail: "https://via.placeholder.com/80",
  },
  {
    id: 2,
    title: "Corporate Intro Video",
    type: "Video",
    category: "Business",
    price: "$25",
    status: "Pending",
    downloads: 0,
    thumbnail: "https://via.placeholder.com/80",
  },
];

export default function MyAssets() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">My Assets</h1>
          <p className="text-gray-500 text-sm">
            Manage and track your uploaded assets
          </p>
        </div>

        <Link
          to="/seller/upload"
          className=" btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Upload New Asset
        </Link>
      </div>

      {/* Assets Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Asset</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Downloads</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={asset.thumbnail}
                    alt=""
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{asset.title}</p>
                    <p className="text-xs text-gray-500">{asset.type}</p>
                  </div>
                </td>

                <td>{asset.category}</td>
                <td>{asset.price}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      asset.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>

                <td>{asset.downloads}</td>

                <td className="p-3 text-right space-x-2">
                  <button className="text-blue-600 hover:underline text-sm">
                    View
                  </button>
                  <button className="text-gray-600 hover:underline text-sm">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {assets.length === 0 && (
          <p className="p-6 text-center text-gray-500">
            No assets uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}
