import express from "express";
import { sendOTP, verifyOTP } from "../controllers";

export default (router: express.Router) => {
  router.post("/send-otp", sendOTP);
  router.post("/verify-otp", verifyOTP);
};
