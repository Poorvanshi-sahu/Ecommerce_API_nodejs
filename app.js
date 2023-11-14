require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// database
const connectDB = require("./db/connect");

// router
const authRouter = require("./routes/authRoutes");

// middlewares
const notFoundMiddleware = require("./middlewares/not_found_middleware");
const errorHandlerMiddleware = require("./middlewares/error_handler_middleware");
const morgan = require("morgan");

const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());

app.get("/api/v1", (req, res) => {
  console.log(req.cookies);
  res.send("get route");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  await connectDB(process.env.MONGO_URI).then(() => console.log("Connected"));
  try {
    app.listen(port, () => {
      console.log("Listening on", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
