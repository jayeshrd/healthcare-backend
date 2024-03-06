import express from "express";
import { createDoctor, getAllDoctorData } from "../models/doctorRegistration.model";

export const createNewDoctor = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      name,
      specialization,
      city,
      doctorGender,
      registrationCouncil,
      registrationNumber,
      registrationYear,
      degree,
      institute,
      yearOfCompletion,
      experience,
      email,
      contactNumber
    } = req.body;

    const doctor = await createDoctor({
      name,
    specialization,
    city,
    doctorGender,
    registrationCouncil,
    registrationNumber,
    registrationYear,
    degree,
    institute,
    yearOfCompletion,
    experience,
    email,
    contactNumber
    });
  

    return res.send({ message: "Success", data: doctor });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const getAllDoctor = async (
  req:express.Request,
  res:express.Response
) =>{
  try {
    const doctor = await getAllDoctorData();
    return res.status(200).send(doctor);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
    
  }
}
