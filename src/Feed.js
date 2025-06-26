import React, { useState } from "react";
import { Heart, Upload } from "lucide-react";
import { Link } from "react-router-dom";

// Simulated avatars
const avatars = {
  ken_drip: "https://i.pravatar.cc/150?u=ken",
  mel_fits: "https://i.pravatar.cc/150?u=mel",
  joyce_fit: "https://i.pravatar.cc/150?u=joyce",
  you: "https://i.pravatar.cc/150?u=you",
};

// Sample fit posts
const initialFits = [
  {
    id: 1,
    user: "ken_drip",
    image: "https://source.unsplash.com/random/800x600/?fashion,black",
    caption: "Monochrome mood 🖤",
    tags: ["Darkwear", "Minimal"],
    likes: 12,
    liked: false,
    comments: [
      {
        id: 1,
        user: "mel_fits",
        text: "🔥 clean af",
        time: new Date("2025-06-26T11:20:00"),
      },
    ],
  },
  {
    id: 2,
    user: "mel_fits",
    image: "https://source.unsplash.com/random/800x600/?streetwear",
    caption: "Thrift king 🧥",
    tags: ["Streetwear", "Thrift", "Layered"],
    likes: 23,
    liked: false,
    comments: [],
  },
  {
    id: 3,
    user: "joyce_fit",
    image: "https://source.unsplash.com/random/800x600/?fashion,colorful",
    caption: "Summer drip 🍑",
    tags: ["Y2K", "Retro", "Vibrant"],
    likes: 34,
    liked: false,
    comments: [
      {
        id: 1,
        user: "ken_drip",
        text: "colors pop 🤩",
        time: new Date("2025-06-26T11:40:00"),
      },
    ],
  },
];

function Feed() {
  const [fits, setFits] = useState(initialFits);
  const [commentInputs, setCommentInputs] = useState({});

  const toggleLike = (id) => {
    const updated = fits.map((fit) =>
      fit.id === id
        ? {
            ...fit,
            liked: !fit.liked,
            likes: fit.liked ? fit.likes - 1 : fit.likes + 1,
          }
        : fit
    );
    setFits(updated);
  };

  const handleCommentChange = (fitId, text) => {
    setCommentInputs({ ...commentInputs, [fitId]: text });
  };

  const handleAddComment = (fitId) => {
    const text = commentInputs[fitId];
    if (!text || text.trim() === "") return;

    const newComment = {
      id: Date.now(),
      user: "you",
      text,
      time: new Date(),
    };

    const updatedFits = fits.map((fit) =>
      fit.id === fitId
        ? {
            ...fit,
            comments: [...fit.comments, newComment],
          }
        : fit
    );

    setFits(updatedFits);
    setCommentInputs({ ...commentInputs, [fitId]: "" });
  };

  const formatTime = (date) => {
    const diff = (new Date() - date) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white px-4 py-10">
      {/* Header */}
      <div className="flex justify-center mb-10">
        <Link to="/">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight hover:text-indigo-600 transition duration-200">
            FitCheck
          </h1>
        </Link>
      </div>

      {/* Upload Fit Button */}
      <Link
        to="/upload"
        className="fixed bottom-8 right-8 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 flex items-center gap-2 transition-all duration-200 z-50"
      >
        <Upload className="w-4 h-4" />
        Upload Fit
      </Link>

      {/* Feed */}
      <div className="flex flex-col gap-10 max-w-3xl mx-auto">
        {fits.map((fit) => (
          <div
            key={fit.id}
            className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            {/* Poster */}
            <div className="flex items-center gap-3 p-4">
              <Link to={`/user/${fit.user}`} className="flex items-center gap-2 hover:underline">
                <img
                  src={avatars[fit.user] || "https://i.pravatar.cc/40?u=default"}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-sm font-medium text-gray-800">{fit.user}</span>
              </Link>
            </div>

            {/* Fit Image */}
            <img
              src={fit.image}
              alt="fit"
              className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-300"
            />

            <div className="p-4">
              {/* Caption + Tags */}
              <p className="text-gray-700 font-medium mb-2">{fit.caption}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {fit.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Likes + Time */}
              <div className="flex items-center justify-between border-t pt-3 pb-2 mb-3">
                <button
                  onClick={() => toggleLike(fit.id)}
                  className="flex items-center space-x-1 group"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      fit.liked ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-400"
                    }`}
                  />
                  <span className="text-sm text-gray-600">{fit.likes}</span>
                </button>
                <span className="text-xs text-gray-400">{formatTime(new Date())}</span>
              </div>

              {/* Comments */}
              <div className="space-y-3">
                {fit.comments
                  .slice()
                  .sort((a, b) => b.time - a.time)
                  .map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3 text-sm">
                      <Link to={`/user/${comment.user}`}>
                        <img
                          src={avatars[comment.user] || "https://i.pravatar.cc/30?u=default"}
                          alt={comment.user}
                          className="w-7 h-7 rounded-full"
                        />
                      </Link>
                      <div>
                        <span className="font-semibold text-gray-700">
                          <Link to={`/user/${comment.user}`} className="hover:underline">
                            {comment.user}
                          </Link>
                        </span>{" "}
                        <span className="text-gray-600">{comment.text}</span>
                        <div className="text-xs text-gray-400">{formatTime(comment.time)}</div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Comment Input */}
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputs[fit.id] || ""}
                  onChange={(e) => handleCommentChange(fit.id, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button
                  onClick={() => handleAddComment(fit.id)}
                  className="text-indigo-500 font-semibold text-sm"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
