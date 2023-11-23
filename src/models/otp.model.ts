import mongoose from "mongoose";
import { mailSender } from "../utils/mailSender";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
export const OtpModel = mongoose.model("OTP", otpSchema);

//utils
// Define a function to send emails
export const sendOtpToEmail = async (email: string, otp: number) => {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `
      <p>Here is your OTP code: ${otp}</p>
      <b>NOTE:</b> Only valid for 5 min
      `
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
};
