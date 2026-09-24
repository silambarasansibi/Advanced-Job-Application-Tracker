const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


router.post("/", upload.single("resume"), (req, res) => {
  try {
    console.log("FILE:", req.file); // debug

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({
      url: `http://localhost:5000/uploads/${req.file.filename}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;