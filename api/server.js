import connect from "./libs/database.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import registerRouter from "./routes/register.route.js";




await connect();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());



app.use("/register" , registerRouter);

//app.use("/login", loginRouter);


const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(globalErrorHandler);