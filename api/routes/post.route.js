import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";

const router = Router();

router.use(authenticateToken);

// router.post("/create", createPost);
// router.patch("/edit/:postId", editPost);
// router.delete("/delete/:postId", deletePost);
//? likes to posts
// router.patch("/:postId/like/", likePost);
// router.patch("/:postId/removeLike/", removeLikeFromPost);
//? comments to posts
// router.patch("/:postId/addComment/", addCommentToPost);
// router.patch("/:postId/editComment/:commentId", editComment);
// router.patch("/:postId/removeComment/:commentId")

export default router;
