import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to NoteNest Student Notes Website!"
  });
});

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