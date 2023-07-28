import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/comment.js";

const router = express.Router();

//add comment
router.post("/", verifyToken, addComment);

//delete comment
router.delete("/:id", verifyToken, deleteComment);

//get comments
router.get("/find/:videoId", getComments);

export default router;
