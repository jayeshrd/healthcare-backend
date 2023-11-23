import express from "express";
import { OtpModel, sendOtpToEmail } from "../models";
import { generateOTP } from "../utils/otpGenerator";

export const sendOTP = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    await new OtpModel({ email, otp }).save();
    await sendOtpToEmail(email, otp);
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false });
  }
};
export const verifyOTP = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("hi");
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false });
  }
};
