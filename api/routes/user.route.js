import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { getUserData, getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", authenticateToken, getUserData);
router.get("/suggestedFriends", authenticateToken, getAllUsers);

export default router;