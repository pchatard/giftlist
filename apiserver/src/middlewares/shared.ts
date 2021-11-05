import List from "../services/ListService";
import SharedListAccessError from "../errors/ListErrors/SharedListAccessError";
import UnvalidSharingCodeError from "../errors/ListErrors/UnvalidSharingCodeError";
import { Request, Response } from "express";

export async function preventOwner(req: Request, _: Response, next: Function) {
	try {
		const response = await List.getSharedList(req.database, req.params.sharingCode);
		if (response) {
			const { ownerId } = response as { ownerId: string };
			const userId = req.uid;
			if (ownerId === userId) {
				throw new SharedListAccessError();
			}
			next();
		} else {
			throw new UnvalidSharingCodeError();
		}
	} catch (error) {
		next(error);
	}
}
