import express from "express";
import { checkInputs } from "../middleware/checkInputs.js";
import { postLogin } from "../controllers/loginController.js";

const router = express.Router();


router.post("/", checkInputs, postLogin);

export default router;