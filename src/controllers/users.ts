import express from "express";
import { getUsers } from "../models/user.model";

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
