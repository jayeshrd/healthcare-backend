import express from "express";
// const httpStatus = require('http-status');
// const catchAsync = require('../utils/catchAsync');
const { labVendorService } = require("../services");
import { createVendor, updateVendorDb } from "../models/labVendor.model";
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
      remark
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
    // console.log("user controller", vendor);


    // var vendortToUser = {
    //   email: vendor.labEmail,
    //   password: `${vendor.ownerName}@123`,
    //   firstName: vendor.ownerName,
    //   lastName: vendor.labName,
    //   role: "labVendor",
    //   status: "approved",
    // };
    // console.log("🚀 ~ vendortToUser:", vendortToUser)
    

    if (vendor) {
      
      // const user = await createNewUser(
      //   vendortToUser.email,
      //   vendortToUser.password,
      //   vendortToUser.firstName,
      //   vendortToUser.lastName,
      //   vendortToUser.role,
      //   vendortToUser.status
      // );
      // console.log("🚀 ~ user:", user)
      // return res.send({ message: "Success", data: user });
      return res.status(200).json(vendor);
    } else {
      return res.status(404).json({ error: "Vendor not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
