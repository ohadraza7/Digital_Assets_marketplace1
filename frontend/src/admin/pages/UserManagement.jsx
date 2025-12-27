import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchUsers();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const changeRole = async (id, role) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${id}/role`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchUsers();
    } catch (err) {
      console.error("Failed to change role", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>
              <td className="p-3">
                {u.status === "suspended" ? (
                  <span className="text-red-500 font-semibold">Suspended</span>
                ) : (
                  <span className="text-green-600 font-semibold">Active</span>
                )}
              </td>

              <td className="p-3 flex gap-2">
                {u.status === "suspended" ? (
                  <button
                    className="px-3 py-1 rounded bg-green-600 text-white"
                    onClick={() => updateStatus(u._id, "active")}
                  >
                    Restore
                  </button>
                ) : (
                  <button
                    className="px-3 py-1 rounded bg-red-600 text-white"
                    onClick={() => updateStatus(u._id, "suspended")}
                  >
                    Suspend
                  </button>
                )}

                <select
                  className="border p-1 rounded"
                  value={u.role}
                  onChange={(e) => changeRole(u._id, e.target.value)}
                >
                  <option value="buyer">Buyer</option>
                  <option value="creator">Creator</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
