export default function AssetDetails() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Preview */}
      <div className="lg:col-span-2">
        <img
          src="/asset3.jpeg"
          alt="image"
          className="rounded-xl border w-100"
        />

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600 leading-relaxed">
            This professionally designed UI kit is perfect for dashboards, admin
            panels, and SaaS applications. Fully customizable and
            well-structured.
          </p>
        </div>
      </div>

      {/* Purchase Box */}
      <div className="bg-white border rounded-xl p-6 h-fit">
        <h1 className="text-2xl font-semibold mb-2">Modern Dashboard UI Kit</h1>

        <p className="text-gray-500 text-sm mb-4">Category: UI Templates</p>

        <p className="text-3xl font-bold mb-6">$18</p>

        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">
          Buy & Download
        </button>

        <ul className="mt-6 text-sm text-gray-600 space-y-2">
          <li>✔ Lifetime access</li>
          <li>✔ Commercial license</li>
          <li>✔ Instant download</li>
        </ul>
      </div>
    </div>
  );
}
