import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import {
  createPost,
  editPost,
  deletePost,
  likePost,
  // removeLikeFromPost,
  addCommentToPost,
  editComment,
  removeComment,
  getAllPosts,
  getUserPosts,
} from "../controllers/post.controller.js";

const router = Router();

router.use(authenticateToken);

router.post("/create", createPost);
router.patch("/edit/:id", editPost);
router.delete("/delete/:id", deletePost);
//? likes to posts
router.patch("/like/:id", likePost);
// router.patch("/removeLike/:id", removeLikeFromPost);
//? comments to posts
router.patch("/addComment/:id/", addCommentToPost);
router.patch("/:id/editComment/:commentId", editComment);
router.patch("/:id/removeComment/:commentId", removeComment);
//? optionally later add like/removeLike for comment

// !_______________________________
// !_______________________________
// !_______________________________
// * Herr Mekael -->

router.get("/getPosts", getAllPosts);
router.get("/:username/getUserPosts", getUserPosts);
export default router;
