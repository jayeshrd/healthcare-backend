import express from "express";
import authentication from "./authentication";
import users from "./users";
import otp from "./otp";
import labVendor from "./labVendor";
import packages from "./package";
import mainPackage from "./mainPackage";


const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  otp(router);
  labVendor(router)
  packages(router)
  mainPackage(router)
  return router;
};
