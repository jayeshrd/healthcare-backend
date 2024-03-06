import express from "express";
import {
  getUserById,
  getUserBySessionToken,
  getUsers,
} from "../models/user.model";
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
export const getUser = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  // console.log("🚀 ~ getUser ~ id:", id)

  try {
    const user = await getUserById(id);
    // console.log("🚀 ~ getUser ~ user:", user)
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ error: "User Not Found" });
    }
  } catch (error) {}
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
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
