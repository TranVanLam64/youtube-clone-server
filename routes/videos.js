import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getByTags,
  getVideo,
  random,
  search,
  sub,
  trend,
  updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo);

//update a video
router.put("/:id", verifyToken, updateVideo);

//delete a video
router.delete("/:id", verifyToken, deleteVideo);

//get a video
router.get("/find/:id", getVideo);

//update view
router.put("/view/:id", addView);

//get trend video
router.put("/trend", trend);

//get random video
router.put("/random", random);

//get sub video
router.put("/sub", verifyToken, sub);

//get by tag
router.get("/tags", getByTags);

//get by search
router.get("/search", search);

export default router;
