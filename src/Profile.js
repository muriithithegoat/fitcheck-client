// src/Profile.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFit } from "./context/FitContext";
import { Heart } from "lucide-react";

function Profile() {
  const { userId } = useParams();
  const { fits, user, profiles, updateBio } = useFit();
  const userFits = fits.filter((fit) => fit.user === userId);

  const [editing, setEditing] = useState(false);
  const [newBio, setNewBio] = useState(profiles[userId]?.bio || "");

  const handleSave = () => {
    updateBio(userId, newBio);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={`https://i.pravatar.cc/100?u=${userId}`}
            alt="pfp"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">@{userId}</h2>
            {!editing ? (
              <>
                <p className="text-gray-600">{profiles[userId]?.bio || "No bio yet."}</p>
                {user === userId && (
                  <button
                    onClick={() => setEditing(true)}
                    className="text-sm text-indigo-600 mt-1 hover:underline"
                  >
                    Edit Profile
                  </button>
                )}
              </>
            ) : (
              <div className="mt-1">
                <textarea
                  className="w-full border px-3 py-2 text-sm rounded-md"
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-indigo-500 text-white rounded-md text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="text-sm text-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-1">{userFits.length} fit{userFits.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {userFits.length === 0 && (
            <p className="text-gray-500">No posts yet.</p>
          )}

          {userFits.map((fit) => (
            <div
              key={fit.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                src={fit.image}
                alt="fit"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="font-semibold text-gray-800">{fit.caption}</p>
                <div className="text-sm text-gray-500 mt-1">
                  {fit.tags.map((tag, i) => (
                    <span key={i} className="mr-2">#{tag}</span>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <Heart className="w-4 h-4 text-red-500" />
                  {fit.likes} likes
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
