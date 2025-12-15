import { useState } from "react";

export default function UploadAsset() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    price: "",
    license: "standard",
    isFree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // send data to backend
  };

  return (
    <div className=" mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Upload New Asset</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Asset Title */}
        <div className="">
          <label className=" feild   block font-medium mb-1">Asset Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Modern Landing Page UI Kit"
            className="w-full border rounded px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe your asset clearly..."
            className="w-full border rounded px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Category & License */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            >
              <option value="">Select Category</option>
              <option value="photos">Photos</option>
              <option value="videos">Videos</option>
              <option value="audio">Audio</option>
              <option value="graphics">Graphics</option>
              <option value="ui-kits">UI Kits</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">License Type</label>
            <select
              name="license"
              value={form.license}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            >
              <option value="standard">Standard License</option>
              <option value="extended">Extended License</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-1">Tags</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="design, ui, modern (comma separated)"
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block font-medium mb-1">Price (USD)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              disabled={form.isFree}
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="isFree"
              checked={form.isFree}
              onChange={handleChange}
            />
            <span>Mark as Free Asset</span>
          </div>
        </div>

        {/* Upload Files */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Asset File</label>
            <input
              type="file"
              className="w-full border-2 rounded border-dashed h-10 p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Preview Image</label>
            <input
              type="file"
              className="w-full border-2 rounded border-dashed h-10 p-2"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
}
