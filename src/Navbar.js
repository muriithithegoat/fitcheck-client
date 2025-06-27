// src/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFit } from "./context/FitContext";

function Navbar() {
  const { user } = useFit();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-gray-800 hover:text-indigo-600">
        FitCheck
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/upload"
          className="bg-indigo-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-indigo-600"
        >
          Upload
        </Link>

        <div
          onClick={() => navigate(`/user/${user}`)}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80"
        >
          <img
            src={`https://i.pravatar.cc/40?u=${user}`}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-700 font-medium">@{user}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
