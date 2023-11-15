import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
require("dotenv").config();

/* middlewares */
const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


/* server */
const port = process.env.PORT;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`);
});
