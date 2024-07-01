import express from "express";
import { checkInputs } from "../middleware/checkInputs.js";
import { registerPost } from "../controllers/register.controller.js";

const router = express.Router();


router.post("/", checkInputs, registerPost);

export default router;