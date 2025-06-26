import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageFile || !caption.trim()) {
      alert("Image and caption are required");
      return;
    }

    // Simulate sending to server or global state (for now just redirect)
    console.log("Image File:", imageFile);
    console.log("Caption:", caption);
    console.log("Tags:", tags.split(",").map(t => t.trim()));

    // TODO: integrate with your backend or state manager
    navigate("/"); // back to feed after upload
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Upload Your Fit</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select an image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 rounded-lg max-h-80 object-cover"
              />
            )}
          </div>

          {/* Caption */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Thrift king 🧥"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Streetwear, Thrift, Black"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
          >
            Post Fit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
