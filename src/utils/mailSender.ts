// utils/mailSender.js
import nodemailer, { SentMessageInfo } from "nodemailer";

interface mailSenderResponse {
  success: boolean;
  data?: SentMessageInfo;
  error?: string;
}

export const mailSender = async (
  email: string,
  title: string,
  body: string
): Promise<mailSenderResponse> => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return { success: true, data: info };
  } catch (error) {
    console.error(error.message);
    return { success: false, error: error.message };
  }
};
