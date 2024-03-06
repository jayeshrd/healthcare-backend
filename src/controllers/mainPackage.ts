import express from "express";
import { createMainPackage,deletePackageDb,getAllmainPackage, updatemainPackages,getmainPackage } from "../models/mainPackage.model";
import { getAllPackage } from "./package";

export const createMainPackages = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, subTitle, price, discount, description } = req.body;
  
    const packages = await createMainPackage({
      title,
      subTitle,
      price,
      discount,
      description,
    });

    return res.send({message:"Success",data:packages})
  } catch (error) {
    return res
    .status(500)
    .send({message:error.message || "Internal Server Error"});

  }
};

export const getAllmainPackages= async (
   
  req:express.Request,
  res:express.Response
)=>{
  try {
    const Allpackage = await getAllmainPackage();
    return res.status(200).send(Allpackage)
  } catch (error) {
    console.log(error);
    return res.sendStatus(400)
  }

}

export const getmainPackages= async (
   
  req:express.Request,
  res:express.Response
)=>{
  const subTitle = req.params.id
  // console.log("🚀 ~ subTitle:", subTitle)
  try {
    const singlepackage = await getmainPackage(subTitle);
    // console.log("🚀 ~ singlepackage:", singlepackage)
    return res.status(200).send(singlepackage)
  } catch (error) {
    console.log(error);
    return res.sendStatus(400)
  }

}

export const updatemainPackage = async(
  req:express.Request,
  res:express.Response
) =>{
  try {
    const Id = req.params.id
    // const data = req.body

    
    const updatemainPackageData = await updatemainPackages(Id,req.body)

    if (updatemainPackageData) {
      return res.status(200).json(updatemainPackageData)
    } else {
      return res.status(404).json({error:"package not found"})
    }
  } catch (error) {
    console.error('Error updating package:',error);
    return res.status(500).json({error:"Internal server error",message:error.message})
  }
}

export const deletePackageById = async (
  req:express.Request,
  res:express.Response
) =>{
  const id = req.params.id

  try {
    const mainPackage = await deletePackageDb(id);
    if (mainPackage) {
      return res.status(200).json(mainPackage);
    } else {
      return res.status(404).json({error:"package not found"});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:"Internal Server error"})
  }
};