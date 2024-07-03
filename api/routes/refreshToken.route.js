import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { refreshTokens } from "../controllers/refreshToken.controller.js";

const router = express.Router();

router.use(authenticateToken)

router.get("/", refreshTokens)

export default router;