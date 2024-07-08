import connect from "./libs/database.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import signupRouter from "./routes/signup.route.js";
import loginRouter from "./routes/login.route.js";
import createProfileRouter from "./routes/createProfile.route.js";
import refreshTokenRouter from "./routes/refreshToken.route.js";
import getUserDataRouter from "./routes/user.route.js";
import logoutRouter from "./routes/logout.route.js";
import eventRouter from "./routes/event.route.js";
import postRouter from "./routes/post.route.js";

await connect();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());

// Routes

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/createProfile", createProfileRouter);
app.use("/getUserData", getUserDataRouter);
app.use("/event", eventRouter);
app.use("/post", postRouter);
app.use("/refresh-token", refreshTokenRouter);

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(globalErrorHandler);
