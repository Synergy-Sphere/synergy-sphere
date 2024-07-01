import { Router } from "express";
import { createProfile } from "../controllers/createProfile.controller.js";

const router = Router();

router.patch("/", createProfile);

export default router;