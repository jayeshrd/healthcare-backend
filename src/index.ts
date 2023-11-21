import express from "express";
const app = express();
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from "./routes";

require("dotenv").config();

/* middlewares */
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

/* Routes */
app.use("/", router());

/* server start */
const port = process.env.PORT;
const server = http.createServer(app);
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () => {
      console.log(`Running on http://localhost:${port}/`);
    });
  } catch (error) {
    console.log(error);
  }
};

/* DB Connect */
const connectDB = (url: string) => {
  return mongoose
    .connect(url)
    .then(() => console.log("CONNECTED TO DB"))
    .catch((err) => {
      console.error("Error connecting to DB:", err);
      throw err;
    });
};

startServer();
