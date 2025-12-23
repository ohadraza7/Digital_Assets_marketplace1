export default function FilterSidebar() {
  return (
    <aside className="border rounded-xl p-5 h-fit sticky bg-blue">
      <h3 className="font-semibold mb-4">Filter Assets</h3>

      {/* Category */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-2">Category</p>
        {["Graphics", "Templates", "Video", "Audio"].map((cat) => (
          <label key={cat} className="flex items-center gap-2 text-sm mb-1">
            <input type="checkbox" />
            {cat}
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-2">Price</p>
        <select className="w-full border rounded px-3 py-2 text-sm">
          <option>All</option>
          <option>Free</option>
          <option>Paid</option>
        </select>
      </div>

      {/* Rating */}
      <div>
        <p className="text-sm font-medium mb-2">Rating</p>
        <select className="w-full border rounded px-3 py-2 text-sm">
          <option>All</option>
          <option>4★ & above</option>
          <option>3★ & above</option>
        </select>
      </div>
    </aside>
  );
}
