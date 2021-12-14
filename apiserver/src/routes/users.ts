import express from "express";
import UserController from "../controllers/UserController";
import controllerWrap from "../helpers/controllerWrap";

const users = express.Router();

/** Create a new user in Database */
users.put("/", controllerWrap(UserController.create));

/** Delete a user */
users.delete("/:userId", controllerWrap(UserController.delete));

/** Get user data */
users.get("/:userId", controllerWrap(UserController.get))

export default users;
