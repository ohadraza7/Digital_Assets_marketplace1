import { useState } from "react";
import PendingAssets from "../components/PendingAssets";
import ApprovedAssets from "../components/ApprovedAssets";
import RejectedAssets from "../components/RejectedAssets";

export default function AssetsModeration() {
  const [tab, setTab] = useState("pending");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Asset Moderation Panel</h1>

      {/* TABS */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            tab === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("pending")}
        >
          Pending
        </button>

        <button
          className={`px-4 py-2 rounded ${
            tab === "approved" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("approved")}
        >
          Approved
        </button>

        <button
          className={`px-4 py-2 rounded ${
            tab === "rejected" ? "bg-red-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("rejected")}
        >
          Rejected
        </button>
      </div>

      {/* TAB CONTENT */}
      {tab === "pending" && <PendingAssets />}
      {tab === "approved" && <ApprovedAssets />}
      {tab === "rejected" && <RejectedAssets />}
    </div>
  );
}
