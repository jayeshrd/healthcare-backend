import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

/* middlewares */
const app = express();

// CORS middleware: Enables Cross-Origin Resource Sharing and allows the server to respond to requests from different origins
app.use(
  cors({
    credentials: true,
  })
);

// Compression middleware: Reduces the size of the response body and hence increases the speed of a web app
app.use(compression());

// Cookie-parser middleware: Parses Cookie header and populates req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// Body-parser middleware: Extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json());

/* server start */
const port = process.env.PORT;
const server = http.createServer(app);
const startServer=async()=>{
 try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () => {
        console.log(`Running on http://localhost:${port}/`);
      });
 } catch (error) {
    console.log(error);
 }
}

/* DB Connect */
const connectDB = (url:string) => {
    return mongoose.connect(url)
    .then(() => console.log("CONNECTED TO DB"))
    .catch((err) => {
        console.error("Error connecting to DB:", err);
        throw err; 
    });
};

startServer();