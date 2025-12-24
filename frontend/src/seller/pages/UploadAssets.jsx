import { useState } from "react";
import axios from "axios";

export default function UploadAsset() {
  // const [previewURL, setPreviewURL] = useState("");

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const [slug, setSlug] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    price: "",
    license: "standard",
    isFree: false,
  });

  const [assetFile, setAssetFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assetFile || !previewImage) {
      alert("Please upload asset file & preview image");
      return;
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    formData.append("price", form.isFree ? 0 : form.price);
    formData.append("isFree", JSON.stringify(form.isFree));

    formData.append("assetFile", assetFile);
    formData.append("previewImage", previewImage);

    const token = localStorage.getItem("token");

    try {
      setUploading(true);
      setProgress(0);

      const res = await axios.post(
        "http://localhost:5000/api/assets/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (evt) => {
            const percent = Math.round((evt.loaded * 100) / evt.total);
            setProgress(percent);
          },
        }
      );

      console.log("Upload success:", res.data);
      alert("Asset submitted for review ✔");

      // reset form
      setForm({
        title: "",
        description: "",
        category: "",
        tags: "",
        price: "",
        license: "standard",
        isFree: false,
      });

      setAssetFile(null);
      setPreviewImage(null);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed ❌");
    }

    setUploading(false);
  };

  return (
    <div className="mx-auto bg-white p-8 rounded-lg shadow">
      {/* {previewURL && (
        <img src={previewURL} className="h-32 rounded border mb-2" />
      )} */}

      {uploading && (
        <div className="w-full bg-gray-200 rounded h-3">
          <div
            className="bg-blue-600 h-3 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* {error && <p className="text-red-600">{error}</p>} */}
      <h1 className="text-3xl font-bold mb-6">Upload New Asset</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Asset Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
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
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        {/* Category + License */}
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
              <option value="photo">Photo</option>
              <option value="video">Video</option>
              <option value="music">Music</option>
              <option value="graphics">Graphics</option>
              <option value="document">Document</option>
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
            className="w-full border rounded px-4 py-2"
            placeholder="design, modern, ui"
          />
        </div>

        {/* Price + Free toggle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block font-medium mb-1">Price (USD)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              disabled={form.isFree}
              className="w-full border rounded px-4 py-2"
              required={!form.isFree}
            />
          </div>

          <label className="flex gap-2 mt-6">
            <input
              type="checkbox"
              name="isFree"
              checked={form.isFree}
              onChange={handleChange}
            />
            Mark as Free Asset
          </label>
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Asset File</label>
            <input
              type="file"
              onChange={(e) => setAssetFile(e.target.files[0])}
              className="border-2 border-dashed rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Preview Image</label>
            <input
              type="file"
              onChange={(e) => setPreviewImage(e.target.files[0])}
              className="border-2 border-dashed rounded px-2 py-1"
              required
            />
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={uploading}
            className={`px-6 py-2 rounded text-white ${
              uploading ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            {uploading ? "Uploading..." : "Submit for Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
