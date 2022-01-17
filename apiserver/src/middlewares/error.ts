import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";
import OwnershipError from "./../errors/UserErrors/OwnershipError";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
	if (err instanceof ValidateError) {
		res.status(422);
		res.json({
			message: "Validation Failed",
			details: err?.fields,
		});
	} else if (err instanceof OwnershipError) {
		res.status(401).send({
			message: "Unauthorized",
		});
	} else {
		res.status(500);
		res.json({
			name: err.name,
			message: err.message,
		});
	}
}

export function notFoundHandler(_req: Request, res: Response) {
	res.status(404).send({
		message: "Not Found",
	});
}

export function tokenHandler(req: Request, res: Response, next: NextFunction) {
	const token = req.headers["authorization"];
	if (!token) {
		res.status(401).send({
			message: "Unauthorized",
		});
	} else {
		next();
	}
}
