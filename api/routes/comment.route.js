import { Router } from "express";

import authenticateToken from "../middleware/authenticateToken.js";

import {
  getOneComment,
  getAllComments,
  createComment,
  addLikesToComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.use(authenticateToken);
//  http://localhost:5555/comment
router.get("/get-all/:postId", getAllComments);
router.get("/get-one-comment/:commentId", getOneComment);

router.patch("/add-comment/:postId", createComment);
router.patch("/:postId/like-one-comment/:commentId", addLikesToComment);

router.delete("/delete/:commentId", deleteComment);

export default router;
