import express from "express";
import { getUserByEmail } from "../models/user.model";
import { random, authentication } from "../utils/auth";
import { createNewUser } from "../utils/usersAuth";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, firstName, lastName, role, status,labId } = req.body;
    if (!email || !password || !firstName || !lastName || !role || !status) {
      throw new Error("send email, password and username");
    }
    const user = await createNewUser(
      email,
      password,
      firstName,
      lastName,
      role,
      status,
      labId,
    );

    return res.send({ message: "Success", data: user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email: emailWithoutTrim, password } = req.body;
    if (!emailWithoutTrim || !password)
      return res.status(400).send({ message: "send email and password" });

    const email = emailWithoutTrim.trim();

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) throw new Error("No user with given Email");

    const expectedHash = authentication(user.authentication.salt, password);
    if (expectedHash !== user.authentication.password)
      throw new Error("Wrong Password");

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    res.cookie("healthcare", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    return res.status(200).send({ message: "Authenticated", data: user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal Server Error" });
  }
};
