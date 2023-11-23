import express from "express";
import authentication from "./authentication";
import users from "./users";
import otp from "./otp";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  otp(router);
  return router;
};
