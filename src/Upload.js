// src/Upload.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFit } from "./context/FitContext";

function Upload() {
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { fits, setFits, user } = useFit();
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!imageFile || !caption) return alert("Fill in all fields");

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "fitcheck_uploads");
      formData.append("cloud_name", "dlnm7zjmy");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dlnm7zjmy/image/upload",
        formData
      );

      const newFit = {
        id: Date.now(),
        user,
        image: res.data.secure_url,
        caption,
        tags: tags.split(",").map((tag) => tag.trim()),
        likes: 0,
        liked: false,
        comments: [],
      };

      setFits([newFit, ...fits]); // Add new fit to top
      navigate("/"); // Go back to feed
    } catch (err) {
      console.error("Upload error", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-4 py-12">
      <div className="max-w-md w-full space-y-6 p-6 border rounded-xl shadow-sm bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Upload a Fit</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="block w-full text-sm border rounded px-3 py-2 bg-white"
        />

        <input
          type="text"
          placeholder="Caption (e.g. Drip too hard)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border px-3 py-2 rounded text-sm"
        />

        <input
          type="text"
          placeholder="Tags (comma-separated e.g. Y2K, Vintage)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border px-3 py-2 rounded text-sm"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
        >
          {uploading ? "Uploading..." : "Post Fit"}
        </button>
      </div>
    </div>
  );
}

export default Upload;
