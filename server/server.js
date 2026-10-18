
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to NoteNest Student Notes Website!"
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "NoteNest backend is running!",
    database:
      mongoose.connection.readyState === 1
        ? "Connected"
        : "Not connected"
  });
});

// Notes schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Notes model
const Note = mongoose.model("Note", noteSchema);

// Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: notes.length,
      notes
    });
  } catch (error) {
    console.error("Fetch notes error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notes"
    });
  }
});

// Add a new note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, subject, content } = req.body;

    if (
      typeof title !== "string" ||
      typeof subject !== "string" ||
      typeof content !== "string" ||
      !title.trim() ||
      !subject.trim() ||
      !content.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Title, subject and content are required"
      });
    }

    const note = await Note.create({
      title: title.trim(),
      subject: subject.trim(),
      content: content.trim()
    });

    res.status(201).json({
      success: true,
      message: "Note saved successfully",
      note
    });
  } catch (error) {
    console.error("Save note error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to save note"
    });
  }
});

// Start server after MongoDB connects
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is missing");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "NoteNest"
    });

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`NoteNest API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
