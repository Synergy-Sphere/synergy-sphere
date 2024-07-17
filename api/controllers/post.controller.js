import Post from "../models/Post.model.js";
import createError from "http-errors";
import User from "../models/User.model.js";

export const createPost = async (req, res, next) => {
  const tokenUserId = req.user.id;

  const { content, images } = req.body;

  let foundUser;

  try {
    foundUser = await User.findById(tokenUserId);
  } catch {
    return next(createError(500, "Server error"));
  }

  if (!foundUser) {
    return next(createError(403, "Not authorized"));
  } else {
    try {
      const newPost = await Post.create({
        content,
        createdBy: foundUser._id,
        images,
      });

      const updatedUser = await User.findByIdAndUpdate(
        tokenUserId,
        {
          $push: { posts: newPost._id },
        },
        {
          new: true,
        }
      );

      await updatedUser.populate("posts", { content: 1, createdBy: 1 });

      res.status(200).json(updatedUser);
    } catch {
      next(createError(500, "Server error"));
    }
  }
};

export const editPost = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.user.id;

  const { content, images } = req.body;

  let foundPost;

  try {
    foundPost = await Post.findById(id);
  } catch {
    return next(createError(500, "Server error"));
  }

  if (!foundPost) {
    return next(createError(404, "Post doesn't exist"));
  } else {
    if (foundPost.createdBy.toString() !== tokenUserId) {
      return next(createError(403, "Sorry, you are not Creator of this Post"));
    } else {
      try {
        const options = {
          new: true,
          runValidators: true,
        };

        const updatedPost = await Post.findByIdAndUpdate(
          id,
          {
            content,
            images,
          },
          options
        );

        res.status(200).json(updatedPost);
      } catch {
        next(createError(500, "Server error"));
      }
    }
  }
};

export const deletePost = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.user.id;

  let foundPost;

  try {
    foundPost = await Post.findById(id);
  } catch {
    return next(createError(500, "Server error"));
  }

  if (!foundPost) {
    return next(createError(404, "Post doesn't exist"));
  } else {
    if (foundPost.createdBy.toString() !== tokenUserId) {
      return next(createError(403, "Sorry, you are not Host of this post"));
    } else {
      try {
        const options = {
          new: true,
          runValidators: true,
        };

        const deletedPost = await Post.findByIdAndUpdate(
          id,
          { deletedAt: new Date() },
          options
        );

        const foundUser = await User.findById(tokenUserId);
        const postsToRemain = foundUser.posts.filter(
          (post) => post.toString() !== deletedPost.id
        );
        await User.findByIdAndUpdate(tokenUserId, {
          $set: { posts: postsToRemain },
        });

        res.json({
          message: `Post was deleted`,
        });
      } catch {
        next(createError(500, "Server error"));
      }
    }
  }
};

export const likePost = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.user.id;

  let foundPost;

  try {
    foundPost = await Post.findById(id);
  } catch {
    return next(createError(500, "Server error"));
  }

  if (!foundPost) {
    return next(createError(404, "Post doesn't exist"));
  } else {
    const alreadyLiked = foundPost.likes.find(
      (like) => like.toString() === tokenUserId
    );

    try {
      if (alreadyLiked) {
        const options = {
          new: true,
          runValidators: true,
        };

        const likesToRemain = foundPost.likes.filter(
          (like) => like.toString() !== tokenUserId
        );

        await Post.findByIdAndUpdate(
          id,
          {
            $set: { likes: likesToRemain },
          },
          options
        );
      } else {
        const options = {
          new: true,
          runValidators: true,
        };

        await Post.findByIdAndUpdate(
          id,
          {
            $push: { likes: tokenUserId },
          },
          options
        );
      }
    } catch (error) {
      return next(createError(500, "Server error"));
    }
    const allPosts = await Post.find();
    const populatedPosts = await Promise.all(
      allPosts
        .filter((post) => post.deletedAt === null)
        .map(async (post) => {
          await post.populate("createdBy", {
            fullName: 1,
            profilePic: 1,
            username: 1,
          });

          await post.populate("likes", { fullName: 1, _id: 0 });
          return post; // return the populated post
        })
    );

    res.status(200).json(populatedPosts);
  }
};

export const addCommentToPost = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.user.id;
  const { content } = req.body;

  let foundPost;

  try {
    foundPost = await Post.findById(id);
  } catch {
    return next(createError(500, "Server error"));
  }

  if (!foundPost) {
    return next(createError(404, "Post doesn't exist"));
  } else {
    try {
      const options = {
        new: true,
        runValidators: true,
      };

      const newComment = {
        content,
        commentedBy: tokenUserId,
      };

      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          $push: { comments: newComment },
        },
        options
      );

      res.status(200).json(updatedPost);
    } catch {
      next(createError(500, "Server error"));
    }
  }
};

export const editComment = async (req, res, next) => {
  const id = req.params.id;
  const commentId = req.params.commentId;
  const tokenUserId = req.user.id;

  const { content } = req.body;

  let foundPost;

  try {
    foundPost = await Post.findById(id);
  } catch {
    return next(createError(500, "Server error"));
  }

  if (!foundPost) {
    return next(createError(404, "Post doesn't exist"));
  } else {
    const comment = foundPost.comments.find(
      (x) => x._id.toString() === commentId
    );
    if (!comment) {
      return next(createError(404, "Comment doesn't exist"));
    } else {
      if (comment.commentedBy.toString() !== tokenUserId) {
        return next(createError(403, "You can edit only your comments"));
      } else {
        try {
          //   const options = {
          //     new: true,
          //     runValidators: true,
          //   };

          //   const updatedPost = await Post.findByIdAndUpdate(
          //     id,
          //     {
          //       $set: { 'comments.$[comment].content': content },
          //     },
          //     options, { arrayFilters: [{ comment: { _id: commentId } }] }
          //   );
          comment.content = content;
          await foundPost.save();

          res.status(200).json(foundPost);
        } catch {
          next(createError(500, "Server error"));
        }
      }
    }
  }
};

export const removeComment = async (req, res, next) => {
  const id = req.params.id;
  const commentId = req.params.commentId;
  const tokenUserId = req.user.id;

  let foundPost;

  try {
    foundPost = await Post.findById(id);
  } catch {
    return next(createError(500, "Server error"));
  }

  if (!foundPost) {
    return next(createError(404, "Post doesn't exist"));
  } else {
    const comment = foundPost.comments.find(
      (x) => x._id.toString() === commentId
    );
    if (!comment) {
      return next(createError(404, "Comment doesn't exist"));
    } else {
      if (comment.commentedBy.toString() !== tokenUserId) {
        return next(createError(403, "You can remove only your comments"));
      } else {
        try {
          const options = {
            new: true,
            runValidators: true,
          };
          const commentsToRemain = foundPost.comments.filter(
            (x) => x._id.toString() !== commentId
          );

          const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
              $set: { comments: commentsToRemain },
            },
            options
          );

          res.status(200).json(updatedPost);
        } catch {
          next(createError(500, "Server error"));
        }
      }
    }
  }
};

// !_______________________________
// !_______________________________
// !_______________________________
// * Herr Mekael -->

export async function getAllPosts(req, res, next) {
  try {
    const allPosts = await Post.find();

    const populatedPosts = await Promise.all(
      allPosts
        .filter((post) => post.deletedAt === null)
        .map(async (x) => {
          await x.populate("createdBy", {
            fullName: 1,
            profilePic: 1,
          });

          await x.populate("likes", { fullName: 1, _id: 0 });
          return x; // return the populated post
        })
    );
    res.json(populatedPosts);
  } catch {
    next(createError(500, "Server error"));
  }
}

export async function getUserPosts(req, res, next) {
  const { username } = req.params;

  try {
    const foundUser = await User.findOne({ username });
    console.log(foundUser._id);
    const oneUserPosts = await Post.find({ createdBy: foundUser._id });

    const populatedOneUserPosts = await Promise.all(
      oneUserPosts
        .filter((post) => post.deletedAt === null)
        .map(async (x) => {
          await x.populate("createdBy", {
            fullName: 1,
            profilePic: 1,
          });
          await x.populate("likes", { fullName: 1, _id: 0 });
          return x;
        })
    );

    res.json(populatedOneUserPosts);
  } catch {
    next(createError(500, "Server error"));
  }
}

export async function getLikesOnEachPost(req, res, next) {
  try {
  } catch (error) {
    next(createError(500, "Server error"));
  }
}
