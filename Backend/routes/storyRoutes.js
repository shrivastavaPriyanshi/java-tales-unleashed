import express from "express";
const router = express.Router();

import Story from "../models/Story.js";

// Get all stories
router.get("/", async (req, res) => {
  const stories = await Story.find();
  res.json(stories);
});

// Add a story
router.post("/", async (req, res) => {
  const newStory = new Story(req.body);
  await newStory.save();
  res.status(201).json(newStory);
});

export default router;
