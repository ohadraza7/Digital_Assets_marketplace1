import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReviewAsset() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewNotes, setReviewNotes] = useState("");

  const token = localStorage.getItem("token");

  const handleApprove = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/assets/review/${id}/approve`,
        { notes: reviewNotes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/admin");
    } catch (err) {
      console.error("Failed to approve asset", err);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/assets/review/${id}/reject`,
        {
          notes: reviewNotes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/admin");
    } catch (err) {
      console.error("Failed to reject asset", err);
    }
  };

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/assets/review/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAsset(res.data.asset);
      } catch (err) {
        console.error("Failed to fetch asset", err);
      }

      setLoading(false);
    };

    fetchAsset();
  }, [id]);

  if (loading) return <p className="p-6">Loading asset...</p>;

  if (!asset) return <p className="p-6 text-red-600">Asset not found</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 bg-gray-200 rounded mb-4"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-3">Review Asset — {asset.title}</h2>

      {/* Asset Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Preview Image */}
        <div className="bg-white shadow rounded p-3">
          <h3 className="font-semibold mb-2">Preview Image</h3>
          <img src={asset.secureUrl} alt="preview" className="rounded border" />
        </div>

        {/* Info Section */}
        <div className="bg-white shadow rounded p-4 col-span-2">
          <h3 className="font-semibold mb-2">Asset Information</h3>

          <p>
            <strong>Creator:</strong> {asset.seller?.name}
          </p>
          <p>
            <strong>Email:</strong> {asset.seller?.email}
          </p>

          <p>
            <strong>Category:</strong> {asset.category}
          </p>
          <p>
            <strong>License:</strong> {asset.license}
          </p>

          <p className="mt-2">
            <strong>Tags:</strong>{" "}
            {asset.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold mr-2"
              >
                {tag}
              </span>
            ))}
          </p>

          <p className="mt-2">
            <strong>Description:</strong>
          </p>
          <p className="border rounded p-2 bg-gray-50">{asset.description}</p>

          <p className="mt-3">
            <strong>Status:</strong>
            <span className="px-2 py-1 rounded bg-orange-200 ml-2">
              {asset.status}
            </span>
          </p>

          <p className="mt-2">
            <strong>Submitted:</strong>{" "}
            {new Date(asset.createdAt).toLocaleString()}
          </p>

          {/* File Info */}
          <div className="mt-4">
            <p>
              <strong>File Type:</strong> {asset.fileType}
            </p>
            <p>
              <strong>File Size:</strong> {(asset.fileSize / 1024).toFixed(1)}{" "}
              KB
            </p>

            <a
              href={asset.assetUrl}
              target="_blank"
              className="text-blue-600 underline mt-2 inline-block"
            >
              Download Asset File
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 space-x-4 float-right ">
        <h3 className="font-semibold mb-2">Review Actions</h3>

        <textarea
          className="border rounded p-2 w-full"
          placeholder="Add review notes..."
          value={reviewNotes}
          onChange={(e) => setReviewNotes(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={handleApprove}
        >
          Approve
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded ml-2"
          onClick={handleReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
