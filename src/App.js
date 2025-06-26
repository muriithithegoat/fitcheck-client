import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./Feed";
import ProfilePage from "./ProfilePage";
import UploadFit from "./UploadFit";
import Upload from "./Upload"; 

function App() {
  const [fits, setFits] = useState([]); // load or import initial fits

  const handleUpload = (newFit) => {
    setFits([newFit, ...fits]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/" element={<Feed fits={fits} />} />
        <Route path="/user/:username" element={<ProfilePage fits={fits} />} />
        <Route path="/upload" element={<UploadFit onUpload={handleUpload} />} />
      </Routes>
    </Router>
  );
}

export default App;
