import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserById,
  suspendUser,
  unsuspendUser,
} from "../services/adminUserApi";

export default function UserProfileModeration() {
  const { id } = useParams();
  console.log("User ID:", id);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await getUserById(id);
      setUser(res.data.user);
    } catch {
      alert("Failed to load user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSuspend = async () => {
    const reason = prompt("Enter suspension reason");

    if (!reason) return;

    await suspendUser(id, reason);
    alert("User suspended & notified");
    fetchUser();
  };

  const handleUnsuspend = async () => {
    console.log(user);
    await unsuspendUser(id);
    alert("User reinstated");
    fetchUser();
  };

  if (!user) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-semibold">User Moderation</h2>

      <div className="bg-white p-5 rounded shadow">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {user.isSuspended ? (
            <span className="text-red-600 font-semibold bg-red-100 px-2 py-1 rounded">
              Suspended — {user.suspendedReason}
            </span>
          ) : (
            <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
              Active
            </span>
          )}
        </p>

        <div className="mt-4 flex gap-3">
          {user.isSuspended ? (
            <button
              onClick={handleUnsuspend}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Unsuspend User
            </button>
          ) : (
            <button
              onClick={handleSuspend}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Suspend User
            </button>
          )}
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white p-5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">User Notifications</h3>

        {user.notifications?.length === 0 ? (
          <p>No notifications yet</p>
        ) : (
          <ul className="space-y-2">
            {user.notifications.map((n, i) => (
              <li key={i} className="border p-2 rounded">
                {n.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
