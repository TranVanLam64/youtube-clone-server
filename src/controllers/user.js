import { createError } from "../utils/error.js";
import User from "../models/User.js";
import { response_success } from "../utils/response.util.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return response_success(res, updateUser, "User has been updated!");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return response_success(res, "User has been deleted!");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return response_success(res, user, "Get user successful!");
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    return response_success(res, "Subscription successful!");
  } catch (err) {
    next(err);
  }
};

export const unSubscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    return response_success(res, "UnSubscription successful!");
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
