import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { logout } from "../controllers/logout.controller.js";

const router = express.Router();


router.post("/", authenticateToken, logout);

export default router;