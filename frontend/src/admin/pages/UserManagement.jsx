import { useEffect, useState } from "react";
import { getUsers, suspendUser, unsuspendUser } from "../services/adminUserApi";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.log("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSuspend = async (userId) => {
    const reason = prompt("Enter suspension reason:");

    if (!reason) return alert("Suspension reason is required");

    try {
      await suspendUser(userId, reason);
      alert("User suspended & notified");
      fetchUsers();
    } catch {
      alert("Failed to suspend user");
    }
  };

  const handleUnsuspend = async (userId) => {
    try {
      await unsuspendUser(userId);
      alert("User reinstated");
      fetchUsers();
    } catch {
      alert("Failed to unsuspend user");
    }
  };

  if (loading) return <p className="p-8">Loading users...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>

              <td className="p-3">
                <span>{u.status}</span>
                {/* {!u.isSuspended ? (
                  <span className="text-red-600 font-semibold">Suspended</span>
                ) : (
                  <span className="text-green-600 font-semibold">Active</span>
                )} */}
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => {
                    navigate(`/admin/user/${u._id}`);
                  }}
                  className="px-3 py-1 rounded bg-blue-600 text-white"
                >
                  View
                </button>

                {!u.isSuspended ? (
                  <button
                    onClick={() => handleSuspend(u._id)}
                    className="px-3 py-1 rounded bg-red-600 text-white"
                  >
                    Suspend
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnsuspend(u._id)}
                    className="px-3 py-1 rounded bg-green-600 text-white"
                  >
                    Restore
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <UserProfileModeration /> */}
    </div>
  );
}
