import express from "express";
import { getAllUsers } from "../controllers/users";
import { isAuthenticated } from "../middlerwares";
import { updateUser } from "../controllers/users";

export default (router: express.Router) => {
  router.get("/users", getAllUsers);
  router.put("/users/update/:id",updateUser)
};
