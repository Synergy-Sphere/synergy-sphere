import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { getUserData } from "../controllers/user.controller.js";

const router = Router();

router.get("/", authenticateToken, getUserData);


export default router;