import express from "express";
import UserController from "../controllers/UserController";

const users = express.Router();

/** Create a new user in Database */
users.put("/", UserController.create);

/** Gets current user information */
users.get("/me", UserController.me);

export default users;
