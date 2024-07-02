import connect from "./libs/database.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import signupRouter from "./routes/signup.route.js";
import loginRouter from "./routes/login.route.js";
// import createProfileRouter from "./routes/createProfile.route.js";


await connect();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());

// Routes

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
// app.use("/createProfile", createProfileRouter);

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(globalErrorHandler);
