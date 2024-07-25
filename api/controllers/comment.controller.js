import createError from "http-errors";

import User from "../models/User.model.js";
import Post from "../models/Post.model.js";
import Comment from "../models/Comment.model.js";

export async function getOneComment(req, res, next) {
  const tokenUserId = req.user.id;

  const { commentId } = req.params;

  if (!tokenUserId) return next(createError(403, "Unauthorized"));
  try {
    const foundComment = await Comment.findById(commentId)
      .populate({
        path: "commentedBy",
        select: { fullName: 1, profilePic: 1 },
      })
      .populate({
        path: "likes",
        select: { fullName: 1, _id: 0 },
      });

    res.json(foundComment);
  } catch (error) {
    next(createError(500, "Server error"));
  }
}

export async function getAllComments(req, res, next) {
  const { postId } = req.params;
  const tokenUserId = req.user.id;
  if (!tokenUserId) return next(createError(403, "Unauthorized"));
  try {
    const allComments = await Comment.find({ onPost: postId });

    const populatedComments = await Promise.all(
      allComments.map(async (x) => {
        await x.populate({
          path: "commentedBy",
          select: { fullName: 1, profilePic: 1 },
        });
        await x.populate({
          path: "likes",
          select: { fullName: 1, _id: 0 },
        });
        return x;
      })
    );
    // console.log(allComments);
    res.json(populatedComments);
  } catch (error) {
    next(createError(500, "Server error"));
  }
}

export async function createComment(req, res, next) {
  const tokenUserId = req.user.id;
  const { content } = req.body;
  const { postId } = req.params;

  if (!tokenUserId) return next(createError(403, "Unauthorized"));

  if (!content) return next(createError(404, "Empty input"));
  try {
    const foundUser = await User.findById(tokenUserId);
    if (!foundUser) return next(createError(403, "Not authorized"));

    const newComment = await Comment.create({
      onPost: postId,
      content,
      commentedBy: foundUser._id,
    });

    const commentedOnPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    )
      .populate({
        path: "comments",
        select: {
          content: 1,
          commentedBy: 1,
        },
        populate: {
          path: "commentedBy likes",
          select: "fullName profilePic ",
        },
      })
      .populate({
        path: "createdBy",
        select: { fullName: 1, profilePic: 1 },
      })
      .populate({
        path: "likes",
        select: { fullName: 1, _id: 0 },
      });

    // console.log(commentedOnPost);
    res.status(201).json(commentedOnPost);
  } catch (error) {
    next(createError(500, "Server error"));
  }
}

export async function addLikesToComment(req, res, next) {
  const tokenUserId = req.user.id;

  const { postId, commentId } = req.params;

  if (!tokenUserId) return next(createError(403, "Unauthorized"));

  try {
    const foundComment = await Comment.findById(commentId);
    if (!foundComment) return next(createError(404, "Comment not found"));

    const alreadyLiked = foundComment.likes.includes(tokenUserId);

    let update;

    if (alreadyLiked) {
      update = { $pull: { likes: tokenUserId } };
    } else {
      update = { $addToSet: { likes: tokenUserId } };
    }
    const options = {
      new: true,
      runValidators: true,
    };

    await Comment.findByIdAndUpdate(commentId, update, options);

    const allComments = await Comment.find({ onPost: postId });
    const populatedComments = await Promise.all(
      allComments.map(async (x) => {
        await x.populate({
          path: "commentedBy",
          select: { fullName: 1, profilePic: 1 },
        });
        await x.populate({
          path: "likes",
          select: { fullName: 1, _id: 0 },
        });
        return x;
      })
    );

    res.json(populatedComments);
  } catch (error) {
    console.log(error);
    next(createError(500, "Server error"));
  }
}

export async function deleteComment(req, res, next) {
  const tokenUserId = req.user.id;

  const { commentId } = req.params;
  if (!tokenUserId) return next(createError(403, "Unauthorized"));

  try {
    const foundComment = await Comment.findById(commentId);
    if (!foundComment) return next(createError(404, "Comment not found"));

    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Your comment was deleted successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Server error"));
  }
}
