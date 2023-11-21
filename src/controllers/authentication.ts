import express from "express";
import { createUser, getUserByEmail } from "../models/user.model";
import { random, authentication } from "../utils/auth";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .send({ message: "send email, password and username" });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser)
      return res.status(400).send({ message: "Email already exists" });

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(400).send({ message: "Success", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "server error" });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ message: "send email and password" });

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user)
      return res.status(400).send({ message: "No user with given Email" });

    const expectedHash = authentication(user.authentication.salt, password);

    if (expectedHash !== user.authentication.password)
      return res.status(403).send({ message: "Unauthenticated" });

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
    console.log(error);
    return res.status(500).send({ message: "server error" });
  }
};
