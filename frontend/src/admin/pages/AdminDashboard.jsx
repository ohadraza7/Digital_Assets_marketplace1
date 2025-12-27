import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };

  if (!stats) return <p className="p-6">Loading dashboard…</p>;

  return (
    <div className="p-8">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow p-5 rounded">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="bg-white shadow p-5 rounded">
          <h3 className="text-gray-500">Total Assets</h3>
          <p className="text-3xl font-bold">{stats.totalAssets}</p>
        </div>

        <div className="bg-white shadow p-5 rounded">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-3xl font-bold">
            ${stats.totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white shadow p-5 rounded">
          <h3 className="text-gray-500">Pending Reviews</h3>
          <p className="text-3xl font-bold text-orange-500">
            {stats.pendingAssets}
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded p-5">
        <h2 className="text-xl font-semibold mb-3">Recent Platform Activity</h2>

        <ul className="space-y-2">
          {stats.recentActivity.length === 0 && (
            <p className="text-gray-500">No activity yet</p>
          )}

          {stats.recentActivity.map((log) => (
            <li key={log._id} className="text-sm">
              • {log.action}
              <span className="text-gray-400 ml-2">
                ({new Date(log.createdAt).toLocaleString()})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
