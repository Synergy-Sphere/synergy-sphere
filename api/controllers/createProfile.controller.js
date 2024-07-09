import createError from "http-errors";
import User from "../models/User.model.js";

export const updateBio = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.user.id;
  const { bio } = req.body;

  if (id !== tokenUserId) {
    return next(createError(403, "Not authorized"));
  }

  let foundUser;

  try {
    foundUser = await User.findById(id);
  } catch (error) {
    return next(createError(500, "Server error"));
  }

  if (foundUser) {
    try {
      const options = {
        new: true,
        runValidators: true,
      };

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: { bio: bio },
        },
        options
      );

      res.status(201).json({
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        profilePic: updatedUser.profilePic,
        location: updatedUser.location,
        bio: updatedUser.bio,
        friendList: updatedUser.friendList,
        interests: updatedUser.interests,
        posts: updatedUser.posts,
        events: updatedUser.events,
      });
    } catch (error) {
      return next(createError(500, "Server error"));
    }
  } else {
    next(createError(404, "User not found"));
  }
};

export const updateProfilePicture = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.user.id;
  const { profilePic } = req.body;

  if (id !== tokenUserId) {
    return next(createError(403, "Not authorized"));
  }

  let foundUser;

  try {
    foundUser = await User.findById(id);
  } catch (error) {
    return next(createError(500, "Server error"));
  }

  if (foundUser) {
    try {
      const options = {
        new: true,
        runValidators: true,
      };

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: { profilePic: profilePic },
        },
        options
      );

      res.status(201).json({
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        profilePic: updatedUser.profilePic,
        location: updatedUser.location,
        bio: updatedUser.bio,
        friendList: updatedUser.friendList,
        interests: updatedUser.interests,
        posts: updatedUser.posts,
        events: updatedUser.events,
      });
    } catch (error) {
      return next(createError(500, "Server error"));
    }
  } else {
    next(createError(404, "User not found"));
  }
};

// export const updateCoverPicture = (req, res, next) => {
//   // updateCoverPicture
// };

export const updateLocation = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.user.id;
  const { location } = req.body;

  if (id !== tokenUserId) {
    return next(createError(403, "Not authorized"));
  }

  let foundUser;

  try {
    foundUser = await User.findById(id);
  } catch (error) {
    return next(createError(500, "Server error"));
  }

  if (foundUser) {
    try {
      const options = {
        new: true,
        runValidators: true,
      };

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: { location: location },
        },
        options
      );

      res.status(201).json({
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        profilePic: updatedUser.profilePic,
        location: updatedUser.location,
        bio: updatedUser.bio,
        friendList: updatedUser.friendList,
        interests: updatedUser.interests,
        posts: updatedUser.posts,
        events: updatedUser.events,
      });
    } catch (error) {
      return next(createError(500, "Server error"));
    }
  } else {
    next(createError(404, "User not found"));
  }
};

export const updateInterests = async (req, res, next) => {
  const id = req.params.id;

  const tokenUserId = req.user.id;

  const { interests } = req.body;

  if (id !== tokenUserId) {
    return next(createError(403, "Not authorized"));
  }

  let foundUser;

  try {
    foundUser = await User.findById(id);
  } catch (error) {
    return next(createError(500, "Server error"));
  }

  if (foundUser) {
    try {
      const options = {
        new: true,
        runValidators: true,
      };

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: { interests: interests },
        },
        options
      );

      // !_______________________________
      // res.status(201).json({
      //   id: updatedUser._id,
      //   username: updatedUser.username,
      //   email: updatedUser.email,
      //   fullName: updatedUser.fullName,
      //   profilePic: updatedUser.profilePic,
      //   location: updatedUser.location,
      //   bio: updatedUser.bio,
      //   friendList: updatedUser.friendList,
      //   interests: updatedUser.interests,
      //   posts: updatedUser.posts,
      //   events: updatedUser.events,
      // });

      res.status(201).json({ updatedUser });
      // !_______________________________
    } catch (error) {
      return next(createError(500, "Server error"));
    }
  } else {
    next(createError(404, "User not found"));
  }
};
