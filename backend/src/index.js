const express = require("express");
const appRouter = require("./routes/index");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandlerMiddleWare = require("./middleware/errorHandler");
// const { cookie } = require("express-validator");
require("dotenv").config();

const app = express();
app.use(express.json());
const allowedOrigin = "http://localhost:5173";

const corsOptions = {
  origin: function (origin, callback) {
    if (origin === allowedOrigin || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
// override the normal express handler
app.use(errorHandlerMiddleWare);

const PORT = process.env.PORT || 8080;
// console.log(process.env.PORT);

app.listen(PORT, () => {
  console.log(`your app is running on port ${PORT}`);
});
