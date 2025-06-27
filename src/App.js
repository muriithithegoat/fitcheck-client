// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./Feed";
import Upload from "./Upload";
import Profile from "./Profile";
import Navbar from "./Navbar";
import { FitProvider } from "./context/FitContext";

function App() {
  return (
    <FitProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/user/:userId" element={<Profile />} />
        </Routes>
      </Router>
    </FitProvider>
  );
}

export default App;
