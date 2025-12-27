import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RejectedAssets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRejectedAssets();
  }, []);

  const fetchRejectedAssets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/assets/rejected",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAssets(res.data.assets);
    } catch (err) {
      console.error("Failed to fetch rejected assets", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading rejected assets...</p>;

  if (!assets.length)
    return <p className="text-gray-500">No rejected assets yet</p>;

  return (
    <div className="bg-white shadow rounded p-5">
      <h2 className="text-xl font-semibold mb-3">Rejected Assets</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Asset</th>
            <th className="p-3 text-left">Creator</th>
            <th className="p-3 text-left">Reason</th>
            <th className="p-3 text-left">Rejected On</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset) => (
            <tr key={asset._id} className="border-t">
              <td className="p-3">{asset.title}</td>
              <td className="p-3">{asset.seller?.name}</td>
              <td className="p-3 text-red-600">{asset.rejectionReason}</td>
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
