import connect from "./libs/database.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

await connect();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());


// Routes


const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(globalErrorHandler);