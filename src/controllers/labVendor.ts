import express from "express";
// const httpStatus = require('http-status');
// const catchAsync = require('../utils/catchAsync');
const { labVendorService } = require("../services");
import { createVendor } from "../models/labVendor.model";
import { getVendors } from "../models/labVendor.model";

export const createLabVendor = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      labName,
      ownerName,
      labServices,
      labEmail,
      qualification,
      logo,
      contactNo,
      licenceNumber,
      labAvailability,
      labDocument,
    } = req.body;


    const labVendor = await createVendor({
      labName,
      ownerName,
      labServices,
      labEmail,
      qualification,
      logo,
      contactNo,
      licenceNumber,
      labAvailability,
      labDocument,
    });
    console.log(labVendor);

    return res.send({ message: "Success", data: labVendor });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const getAllVendor = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const vendor = await getVendors();
    return res.status(200).send(vendor);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
