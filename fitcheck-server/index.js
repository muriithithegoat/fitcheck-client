const express = require("express");
const multer = require("multer");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const { config } = require("dotenv");

config(); // Load .env

const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use multer to handle image file from frontend
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /upload
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No image uploaded" });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "fitcheck_uploads" },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        return res.json({ url: result.secure_url });
      }
    ).end(file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
