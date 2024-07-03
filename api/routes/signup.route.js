import express from "express";
import checkValues from "../validators/checkValues.validator.js";
import { signup } from "../controllers/signup.controller.js";

const router = express.Router();


router.post("/", checkValues(["fullName", "username","email", "password", "confirmPassword"]), signup);

export default router;