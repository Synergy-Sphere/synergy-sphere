import express from "express";
import checkValues from "../validators/checkValues.validator.js";
import { login } from "../controllers/login.controller.js";

const router = express.Router();


router.post("/", checkValues(["email", "password"]), login);

export default router;