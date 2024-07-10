import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { getUserData, getAllUsers, getOneUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/", authenticateToken, getUserData);
router.get("/suggestedFriends", authenticateToken, getAllUsers);


// !_______________________________
// !_______________________________
// !_______________________________
// * Herr Mekael -->

router.get("/:username", getOneUser)

export default router;