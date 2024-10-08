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

import commentRouter from "./routes/comment.route.js";
import bookingRouter from "./routes/booking.route.js";

await connect();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());
// app.use(express.static('public'));

// Routes

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/createProfile", createProfileRouter);
app.use("/user", getUserDataRouter);
app.use("/event", eventRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/refresh-token", refreshTokenRouter);
app.use("/booking", bookingRouter);

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(globalErrorHandler);
