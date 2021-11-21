import { Request, Response } from "express";
import List from "../services/ListService";

export async function authorize(req: Request, _: Response, next: Function) {
	try {
		// get the listId
		const listId = req.params.listId;

		// Get the owner id
		const ownerId = ((await List.getOne(req.app.get("database"), listId)) as { ownerId: string }).ownerId;

		// Compare user ids
		if (ownerId === req.app.get("uid")) {
			next();
		} else {
			throw new Error("Not authorized");
		}
	} catch (error) {
		next(error);
	}
}
