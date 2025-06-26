import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Simulate logged-in user
const loggedInUser = "you";

function UploadFit({ onUpload }) {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image || !caption) {
      setError("Image and caption are required.");
      return;
    }

    const newFit = {
      id: Date.now(),
      user: loggedInUser,
      image,
      caption,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      likes: 0,
      liked: false,
      comments: [],
    };

    onUpload(newFit);
    navigate("/"); // Go back to feed
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Upload a Fit</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Thrift God ☁️"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. Streetwear, Vintage"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Post Fit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadFit;
