import express from "express";
import UserController from "../controllers/UserController";

const users = express.Router();

/** Create a new user in Database */
users.put("/", async (req, res) => {
	const response = await UserController.create(req.body);
	return res.status(200).json(response);
});

/** Gets current user information */
users.get("/me", UserController.me);

export default users;
