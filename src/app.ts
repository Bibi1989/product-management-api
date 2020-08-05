import express, { Request, Response, NextFunction } from "express";
import createError, { HttpError } from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fileupload from "express-fileupload";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/buycar", {
      useUnifiedTopology: true,
      useFindAndModify: true,
      useNewUrlParser: true,
    });
    console.log("connected to db!!!");
  } catch (error) {
    console.log("error connecting to db!!!");
  }
};

connectDB();

var app = express();

// import routes from the route module
import faqRoute from "./routes/faq.route";
import carRoute from "./routes/car.route";

app.use(fileupload({ useTempFiles: true }));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// endpoints for imported routes
app.use("/api/v1", faqRoute);
app.use("/api/v1", carRoute);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "Something went wrong" });
});

export default app;
