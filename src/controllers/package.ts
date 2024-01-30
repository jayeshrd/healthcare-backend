import express from "express";
import { createPackages, getPackage, updatePackageDb  } from "../models/package.model";


export const createPackagesController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      title, imgurl, href, description, contents 
    } = req.body;

    const packages = await createPackages({
      title, imgurl, href, description, contents 
    });

    console.log(packages);

    return res.send({ message: "Success", data: packages });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const getAllPackage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const vendor = await getPackage();
    return res.status(200).send(vendor);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updatePackage = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
console.log("content",req.body);

  try {
    const updatedPackage = await updatePackageDb(id, req.body);
    console.log("🚀 ~ updatedPackage:", updatedPackage)
   
    if (updatedPackage) {
      return res.status(200).json(updatedPackage);
    } else {
      return res.status(404).json({ error: 'Package not found' });
    }
  } catch (error) {
    console.error('Error updating package:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

