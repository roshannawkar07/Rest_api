const express = require("express");
const app = express();
const noteModel = require("./Models/note.model.js");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

// Create Route
app.post("/api/note", async (req, res) => {
  const { title, discription } = req.body;
  const note = await noteModel.create({
    title,
    discription,
  });

  res.status(201).json({
    message: "Note Created !",
    note,
  });
});

// Get Route
app.get("/api/note", async (req, res) => {
  const note = await noteModel.find();
  res.status(200).json({
    message: "success",
    note,
  });
});

// Delete Route
app.delete("/api/note/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "note deleted successfully",
  });
});

// ✅ PATCH Route Fixed
app.patch("/api/note/:id", async (req, res) => {
  const { id } = req.params;
  const { discription } = req.body; // ✅ fixed

  const updatedNote = await noteModel.findByIdAndUpdate(
    id,
    { discription }, // ✅ fixed
    { new: true },
  );

  res.status(200).json({
    message: "Note updated",
    updatedNote,
  });
});

// PUT Route (unchanged)
app.put("/api/note/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      { title, description },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
