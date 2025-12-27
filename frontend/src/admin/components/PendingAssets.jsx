import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PendingAssets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPendingAssets = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/assets/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAssets(res.data.assets);
      } catch (err) {
        console.error("Failed to load assets", err);
      }

      setLoading(false);
    };

    fetchPendingAssets();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-white shadow rounded p-5 mb-6">
      <h2 className="text-2xl font-bold mb-4">
        Assets Awaiting Review ({assets.length})
      </h2>

      {assets.length === 0 && (
        <p className="text-gray-500">No pending assets 🎉</p>
      )}

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Creator</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Submitted</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset) => (
            <tr key={asset._id} className="border-t">
              <td className="p-3">{asset.title}</td>
              <td className="p-3">{asset.seller?.name}</td>
              <td className="p-3 capitalize">{asset.category}</td>
              <td className="p-3">
                {new Date(asset.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3">
                <Link
                  to={`/admin/review/${asset._id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Review
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
