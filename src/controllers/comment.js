import { createError } from "../utils/error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import {
  response_success,
  response_success_created,
} from "../utils/response.util.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();

    return response_success_created(
      res,
      savedComment,
      "Comment has been created!"
    );
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  const commentId = req.params.id;
  const userId = req.user.id;
  try {
    const comment = await Comment.findById(commentId);
    const video = await Video.findOne({ videoId: comment.videoId });

    if (userId === comment.userId || userId === video.userId) {
      await Comment.findByIdAndDelete(commentId);
      return response_success(res, "Comment has been deleted!");
    } else {
      return next(createError(403, "You can delete your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
