import express from "express";
// const httpStatus = require('http-status');
// const catchAsync = require('../utils/catchAsync');
const { labVendorService } = require("../services");
import { createVendor, deleteVendorById, updateVendorDb } from "../models/labVendor.model";
import { getVendors } from "../models/labVendor.model";
import { createNewUser } from "utils/usersAuth";

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
      remark,
      labAddress,
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
      remark,
      labAddress,
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

export const updateVendor = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;

  try {
    const vendor = await updateVendorDb(id, req.body);
    if (vendor) {
      return res.status(200).json(vendor);
    } else {
      return res.status(404).json({ error: "Vendor not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteVendor = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;

  try {
    const vendor = await deleteVendorById(id);
    if (vendor) {
      return res.status(200).json(vendor);
    } else {
      return res.status(404).json({ error: "Vendor not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
