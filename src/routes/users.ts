import express from "express";
import { getAllUsers, getUser } from "../controllers/users";
import { isAuthenticated } from "../middlerwares";
import { updateUser } from "../controllers/users";

export default (router: express.Router) => {
  router.get("/users", getAllUsers);
  router.get("/user/:id", getUser);
  router.put("/users/update/:id",updateUser)
  // router.put("/user/update/:id",updateUserDetails)
};
