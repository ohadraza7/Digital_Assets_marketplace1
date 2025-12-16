import { useState } from "react";

export default function Profile() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Seller Profile</h1>

        <button
          onClick={() => setEditing(!editing)}
          className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800"
        >
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT – Profile Card */}
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <img
            src="https://i.pravatar.cc/150"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />

          <h2 className="text-lg font-semibold">John Doe</h2>
          <p className="text-gray-500 text-sm">Digital Asset Seller</p>

          <div className="mt-4">
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
              Verified Seller
            </span>
          </div>

          <div className="mt-6 border-t pt-4 text-sm text-gray-600 space-y-2">
            <p>
              Assets Uploaded: <span className="font-semibold">24</span>
            </p>
            <p>
              Total Sales: <span className="font-semibold">18</span>
            </p>
            <p>
              Total Earnings: <span className="font-semibold">$420</span>
            </p>
          </div>
        </div>

        {/* RIGHT – Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  defaultValue="John Doe"
                  disabled={!editing}
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Email</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100"
                  defaultValue="seller@example.com"
                  disabled
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  defaultValue="+92 300 1234567"
                  disabled={!editing}
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Country</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  defaultValue="Pakistan"
                  disabled={!editing}
                />
              </div>
            </div>
          </div>

          {/* Seller Bio */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Seller Bio</h3>

            <textarea
              rows="4"
              className="w-full border rounded-lg px-3 py-2"
              defaultValue="I am a professional digital asset creator specializing in UI kits, illustrations, and multimedia resources."
              disabled={!editing}
            />
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Payout Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-gray-500">Payment Method</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100"
                  defaultValue="Bank Transfer"
                  disabled
                />
              </div>

              <div>
                <label className="text-gray-500">Account Status</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100"
                  defaultValue="Active"
                  disabled
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Payment details can be updated after admin verification.
            </p>
          </div>

          {/* Save Button */}
          {editing && (
            <div className="flex justify-end">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
