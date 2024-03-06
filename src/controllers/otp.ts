import express from "express";
import {
  sendOtpToEmail,
  verifyOtpWithEmail,
  createOTP,
} from "../models/otp.model";

import { createNewUser } from "../utils/usersAuth";
import { generateOTP } from "../utils/otpGenerator";

export const sendOTP = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;

    if (!validateEmail(email)) return res.status(400).send({ success: false });

    const otp = generateOTP();
    await createOTP(email, otp);
    await sendOtpToEmail(email, otp);

    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false });
  }
};
export const verifyOTP = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { otp, firstName, lastName, email,role,status, password ,labId} = req.body;

    await verifyOtpWithEmail(email, otp);

    const user = await createNewUser(email, password, firstName, lastName,role,status,labId);

    return res.send({ message: "OTP verified and User created", data: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: error.message || "server error" });
  }
};

// utils
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};
