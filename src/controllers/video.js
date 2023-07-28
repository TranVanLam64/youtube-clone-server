import { createError } from "../utils/error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";
import {
  response_success,
  response_success_created,
} from "../utils/response.util.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    return response_success_created(res, savedVideo, "Video has been created!");
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      const updateVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return response_success(res, updateVideo, "Video has been updated!");
    } else {
      return next(createError(403, "You can update your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      return response_success(res, "Video has been deleted!");
    } else {
      return next(createError(403, "You can delete your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    return response_success(res, video, "Get video is successful!");
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    return response_success(res, "The view has been increased!");
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    return response_success(res, videos, "Get video by random is successful!");
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    return response_success(res, videos, "Get video by trend is successful!");
  } catch (err) {
    next(err);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    return response_success(res, list, "Get video by sub is successful!");
  } catch (err) {
    next(err);
  }
};

export const getByTags = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    return response_success(res, videos, "Get video by tags is successful!");
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);

    return response_success(res, videos, "Get video by search is successful!");
  } catch (err) {
    next(err);
  }
};
