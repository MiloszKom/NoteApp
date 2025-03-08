const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const cors = require("cors");

helmet({
  crossOriginResourcePolicy: false,
});

app.use(morgan("dev"));

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://milkom-note-app.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(mongoSanitize());
app.use(xss());

require("dotenv").config();

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");
const notesRouter = require("./routes/noteRoutes");

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", notesRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
