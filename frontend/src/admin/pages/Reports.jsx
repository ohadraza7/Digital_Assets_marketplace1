import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    } catch (err) {
      console.error("Failed to load reports", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (!data) return <p className="p-6">Loading reports...</p>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Platform Analysis & Reports</h1>
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-5">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold">{data.users.totalUsers}</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h3 className="text-gray-500">Total Assets</h3>
          <p className="text-3xl font-bold">{data.assets.totalAssets}</p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h3 className="text-gray-500">Pending Assets</h3>
          <p className="text-3xl font-bold text-orange-500">
            {data.assets.pendingAssets}
          </p>
        </div>

        <div className="bg-white shadow rounded p-5">
          <h3 className="text-gray-500">Revenue (Simulated)</h3>
          <p className="text-3xl font-bold">
            ${data.revenue.totalRevenue || 0}
          </p>
        </div>
      </div>

      {/* ASSET STATUS BREAKDOWN */}
      <div className="bg-white shadow rounded p-5">
        <h2 className="text-lg font-semibold mb-3">Asset Moderation Summary</h2>

        <ul className="space-y-1">
          <li>Approved Assets: {data.assets.approvedAssets}</li>
          <li>Rejected Assets: {data.assets.rejectedAssets}</li>
          <li>Pending Review: {data.assets.pendingAssets}</li>
        </ul>
      </div>

      {/* USER DISTRIBUTION */}
      <div className="bg-white shadow rounded p-5">
        <h2 className="text-lg font-semibold mb-3">User Distribution</h2>

        <ul className="space-y-1">
          <li>Creators: {data.users.totalCreators}</li>
          <li>Buyers: {data.users.totalBuyers}</li>
        </ul>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white shadow rounded p-5">
        <h2 className="text-lg font-semibold mb-3">Recent Asset Activity</h2>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Uploaded</th>
            </tr>
          </thead>

          <tbody>
            {data.recentAssets.map((asset) => (
              <tr key={asset._id} className="border-t">
                <td className="p-3">{asset.title}</td>
                <td className="p-3 capitalize">{asset.status}</td>
                <td className="p-3">
                  {new Date(asset.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
