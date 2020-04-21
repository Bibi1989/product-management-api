import express, { Request, Response, NextFunction } from "express";
import createError, { HttpError } from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";
const swaggerDoc = require("../swagger.json");

var app = express();

// import routes from the route module
import userRoute from "./routes/users";
import projectRoute from "./routes/projects";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// endpoints for imported routes
app.use("/auth/v1", userRoute);
app.use("/api/v1/projects", projectRoute);

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
