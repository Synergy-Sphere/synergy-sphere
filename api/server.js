import connect from "./libs/database.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import registerRouter from "./routes/register.route.js";

import createProfileRouter from "./routes/createProfile.route.js";

await connect();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/signup", registerRouter);

app.use("/createProfile", createProfileRouter);

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(globalErrorHandler);
