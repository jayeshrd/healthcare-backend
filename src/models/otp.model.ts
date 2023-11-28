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
export const createOTP = (email: string, otp: number) =>
  new OtpModel({ email, otp }).save();
export const verifyOtpWithEmail = async (email: string, otp: number) => {
  try {
    const foundOtp = await OtpModel.findOne({
      email,
      otp,
    });
    if (!foundOtp) {
      throw new Error("Invalid OTP");
    }
  } catch (error) {
    throw error;
  }
};
export const sendOtpToEmail = async (email: string, otp: number) => {
  try {
    const mailResponse = await mailSender(
      email,
      "Accufly - OTP",
      `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Copy the following OTP to complete your Sign Up procedures.<br> <b>OTP is valid for 5 minutes only</b></p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />Accufly</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Accufly</p>
          </div>
        </div>
      </div>
      `
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
};
