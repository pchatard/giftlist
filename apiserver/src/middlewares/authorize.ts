import { Request, Response } from "express";
import List from "../services/ListService";

export function authorize(req: Request, _: Response, next: Function) {
	try {
		// get the listId
		const listId = req.params.listId;

		// Get the owner id
		const ownerId = (List.getOne(req.database, listId) as { ownerId: string }).ownerId;

		// Compare user ids
		if (ownerId === req.uid) {
			next();
		} else {
			throw new Error("Not authorized");
		}
	} catch (error) {
		next(error);
	}
}
