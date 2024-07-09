import createError from "http-errors";
import User from "../models/User.model.js";

export async function getUserData(req, res, next) {
  try {
    const tokenUserId = req.user.id;
    const foundUser = await User.findById(tokenUserId);

    // If we find a document
    if (foundUser) {
      res.json({
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
        fullName: foundUser.fullName,
        profilePic: foundUser.profilePic,
        location: foundUser.location,
        bio: foundUser.bio,
        friendList: foundUser.friendList,
        interests: foundUser.interests,
        posts: foundUser.posts,
        events: foundUser.events,
      });

      // If we don't find the user
    } else {
      return next(createError(404, "User not found"));
    }
  } catch {
    next(createError(500, "Server error"));
  }
}

export const getAllUsers = async (req,res,next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(createError(500, "Server error"))
  }
}