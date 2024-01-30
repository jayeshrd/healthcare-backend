import express from "express";
import { getUsers } from "../models/user.model";
import { updateUserData } from "../models/user.model";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await getUsers();
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;

  try {
    const vendor = await updateUserData(id, req.body);
   
    
    if (vendor) {
      return res.status(200).json(vendor);
    } else {
      return res.status(404).json({ error: 'Vendor not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};