export const generateOTP = (): number => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};
