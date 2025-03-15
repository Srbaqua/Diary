const express = require("express");
const multer = require("multer");
const Note = require("../models/Note");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Store files in `uploads/`

// Upload text note
router.post("/upload-text", async (req, res) => {
  try {
    const { userId, content } = req.body;
    const note = new Note({ userId, content, concepts: extractConcepts(content) });
    await note.save();
    res.json({ success: true, note });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload note" });
  }
});

// Upload file (image/audio/video)
router.post("/upload-file", upload.single("file"), async (req, res) => {
  try {
    const { userId, content } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;
    const note = new Note({ userId, content, fileUrl, concepts: extractConcepts(content) });
    await note.save();
    res.json({ success: true, note });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// Get related notes
router.get("/related/:topic", async (req, res) => {
    try {
      const { topic } = req.params;
      const notes = await Note.find({ concepts: { $in: [topic.toLowerCase()] } });
      res.json(notes);
    } catch (error) {
      console.error("Search API Error:", error);
      res.status(500).json({ error: "Failed to fetch related notes" });
    }
  });

// Basic function to extract topics (replace with AI-based NLP later)
function extractConcepts(text) {
  return text.split(" ").slice(0, 5); // Simple approach for now
}

module.exports = router;
