const express = require("express");
const app = express();
const noteModel = require("./Models/note.model.js");
const cors = require("cors");
const path = require("path");

app.use(cors());

app.use(express.json());
app.use(express.static("./public"));

//Routes
// Create Route
app.post("/api/note", async (req, res) => {
  const { title, discription } = req.body;
  const note = await noteModel.create({
    title,
    discription,
  });
  console.log(note);

  res.status(201).json({
    message: "Note Created !",
    note,
  });
});

//Get Rout
app.get("/api/note", async (req, res) => {
  const note = await noteModel.find();
  res.status(200).json({
    message: "success",
    note,
  });
});

//Delete Rout
app.delete("/api/note/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "note deleted successfully",
  });
});

//Patch Rour
// app.patch("/api/note/:id", async (req, res) => {
//   const id = req.params.id;
//   const { discription } = req.body;

//   await noteModel.findByIdAndUpdate(id, { discription });
//   const updatedNote = await noteModel.find({ id });
//   res.status(200).json({
//     message: "Note updated",
//     updatedNote,
//   });
// });

app.patch("/api/note/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const updatedNote = await noteModel.findByIdAndUpdate(
    id,
    { description },
    { new: true }, // 👈 agar hum yaha ye na likhe to {updatedNote} purana document return karengam.
  );

  res.status(200).json({
    message: "Note updated",
    updatedNote,
  });
});

// /Update Overol Object
app.put("/api/note/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // validation (important for PUT)
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
