import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ApprovedAssets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchApprovedAssets();
  }, []);

  const fetchApprovedAssets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/assets/approved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAssets(res.data.assets);
    } catch (err) {
      console.error("Failed to fetch approved assets", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading approved assets...</p>;

  if (!assets.length)
    return <p className="text-gray-500">No approved assets yet</p>;

  return (
    <div className="bg-white shadow rounded p-5">
      <h2 className="text-xl font-semibold mb-3">Approved Assets</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Asset</th>
            <th className="p-3 text-left">Creator</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Approved On</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset) => (
            <tr key={asset._id} className="border-t">
              <td className="p-3">{asset.title}</td>
              <td className="p-3">{asset.seller?.name}</td>
              <td className="p-3">{asset.category}</td>
              <td className="p-3">
                {new Date(asset.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
