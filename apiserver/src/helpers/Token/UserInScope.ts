import { NextFunction, Request, Response } from "express";
import NotANumberError from "../Errors/NotANumberError";

export function addUserIdToScope(req: Request, userId: number): void {
	req.app.set("uid", userId.toString())
}

export function getUserIdFromScope(req: Request, _res: Response, _next: NextFunction): number {
	const userId = parseInt(req.body.userId);
	if (!userId || isNaN(userId)) {
		throw new NotANumberError();
	}
	return userId;
}
