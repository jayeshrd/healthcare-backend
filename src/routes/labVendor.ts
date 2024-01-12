import express from "express";
import { createLabVendor } from "../controllers/labVendor";
import { getAllVendor } from "../controllers/labVendor";


export default (router: express.Router) => {
  router.post("/labVender/register", createLabVendor);
  router.get("/labVender/getAllVendor",getAllVendor)
};