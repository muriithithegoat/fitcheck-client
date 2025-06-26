import React from "react";
import { useParams, Link } from "react-router-dom";
import { Heart } from "lucide-react";

// Dummy avatars
const avatars = {
  ken_drip: "https://i.pravatar.cc/150?u=ken",
  mel_fits: "https://i.pravatar.cc/150?u=mel",
  joyce_fit: "https://i.pravatar.cc/150?u=joyce",
  you: "https://i.pravatar.cc/150?u=you",
};

// Simulated fits (same as in Feed.js)
const allFits = [
  {
    id: 1,
    user: "ken_drip",
    image: "https://images.unsplash.com/photo-1611375270901-c9e2d95d0b87?auto=format&fit=crop&w=800&q=80",
    caption: "Monochrome mood 🖤",
    tags: ["Darkwear", "Minimal"],
    likes: 12,
  },
  {
    id: 2,
    user: "mel_fits",
    image: "https://images.unsplash.com/photo-1601582581839-bb60f1f47f3b?auto=format&fit=crop&w=800&q=80",
    caption: "Thrift king 🧥",
    tags: ["Streetwear", "Thrift", "Layered"],
    likes: 23,
  },
  {
    id: 3,
    user: "joyce_fit",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80",
    caption: "Summer drip 🍑",
    tags: ["Y2K", "Retro", "Vibrant"],
    likes: 34,
  },
  {
    id: 4,
    user: "ken_drip",
    image: "https://images.unsplash.com/photo-1610878180933-565f28b9f721?auto=format&fit=crop&w=800&q=80",
    caption: "Cozy layers 🧣",
    tags: ["Layered", "Neutrals"],
    likes: 8,
  },
];

function ProfilePage() {
  const { username } = useParams();
  const userFits = allFits.filter((fit) => fit.user === username);
  const totalLikes = userFits.reduce((sum, fit) => sum + fit.likes, 0);

  // Fake followers/following for now
  const followers = Math.floor(40 + Math.random() * 60);
  const following = Math.floor(20 + Math.random() * 30);

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <Link to="/">
            <h1 className="text-3xl font-bold text-indigo-600 hover:underline">← FitCheck</h1>
          </Link>
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-6 mb-10">
          <img
            src={avatars[username] || "https://i.pravatar.cc/150?u=default"}
            alt="avatar"
            className="w-20 h-20 rounded-full border border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
            <div className="flex gap-4 text-sm text-gray-500 mt-2">
              <span>{userFits.length} posts</span>
              <span>{followers} followers</span>
              <span>{following} following</span>
              <span>{totalLikes} likes</span>
            </div>
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userFits.map((fit) => (
            <div key={fit.id} className="rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition">
              <img src={fit.image} alt="fit" className="w-full h-64 object-cover" />
              <div className="p-4">
                <p className="font-medium text-gray-700">{fit.caption}</p>
                <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                  <div className="flex gap-2 flex-wrap">
                    {fit.tags.map((tag, i) => (
                      <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span>{fit.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {userFits.length === 0 && (
            <p className="text-center col-span-full text-gray-500 mt-10">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
