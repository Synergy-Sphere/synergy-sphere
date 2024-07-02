import express from "express";
import checkValues from "../validators/checkValues.validator.js";
import { signup } from "../controllers/signup.controller.js";

const router = express.Router();


router.post("/", checkValues(["fullName", "username","email", "password", "confirmPassword"]), signup);

export default router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODQwNDBjMGYzOGY4N2JiYWIxNDVkYSIsImlhdCI6MTcxOTkyNzgyMCwiZXhwIjoxNzIxMjIzODIwfQ.FkAtpo7TblCADDh391Wazl_FgseNOqAlIB_Xm1zDz1E; 

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODQwNDBjMGYzOGY4N2JiYWIxNDVkYSIsImlhdCI6MTcxOTkyNzgyMCwiZXhwIjoxNzIxMjIzODIwfQ.FkAtpo7TblCADDh391Wazl_FgseNOqAlIB_Xm1zDz1E