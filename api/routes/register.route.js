// register route
import {Router} from "express";
import { registerPost } from "../controllers/register.controller.js";

const router = Router();

router.post("/", registerPost);

export default router;