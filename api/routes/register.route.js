import express from "express";
import { checkInputs } from "../middleware/checkInputs.js";
import { postUser } from "../controllers/registerController.js";

const router = express.Router();


router.post("/", checkInputs, postUser);

export default router;