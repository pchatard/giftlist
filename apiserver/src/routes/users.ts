import express from "express";
import UserController from "../controllers/UserController";
import controllerWrap from "../helpers/controllerWrap";

const users = express.Router();

/** Create a new user in Database */
users.put("/", controllerWrap(UserController.create));

/** Gets current user information */
users.get("/me", UserController.me);

export default users;
