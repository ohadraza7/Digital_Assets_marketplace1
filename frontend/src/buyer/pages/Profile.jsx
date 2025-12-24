export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-6">Account Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded px-4 py-2" defaultValue="John Doe" />
          <input
            className="border rounded px-4 py-2"
            defaultValue="buyer@email.com"
            disabled
          />
        </div>

        <button className="mt-6 bg-black text-white px-6 py-2 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}
