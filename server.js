require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// --- DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- SCHEMA + MODEL ---
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, default: "" },
  category: { type: String, default: "general" },
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

// --- ROUTES ---

// GET /notes — return all notes (supports ?search= and ?category= query params)
app.get("/notes", async (req, res) => {
  const { search, category } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { body: { $regex: search, $options: "i" } },
    ];
  }
  if (category) {
    filter.category = category;
  }

  const notes = await Note.find(filter);
  res.json(notes);
});

// POST /notes — create a new note
app.post("/notes", async (req, res) => {
  const { title, body, category } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newNote = await Note.create({ title, body, category });
  res.status(201).json(newNote);
});

// PUT /notes/:id — update an existing note
app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body, category } = req.body;

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { title, body, category },
    { new: true },
  );

  if (!updatedNote) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.json(updatedNote);
});

// DELETE /notes/:id — delete a note
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  const deleteId = await Note.findByIdAndDelete(id);

  if (!deleteId) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.json({ message: "Note deleted successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
