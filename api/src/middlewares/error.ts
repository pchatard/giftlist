import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ValidateError } from "tsoa";
import { EntityNotFoundError } from "typeorm";

import OwnershipError, { OwnershipErrorJSON } from "../errors/UserErrors/OwnershipError";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
	if (err instanceof ValidateError) {
		res.status(422);
		res.json({
			message: "Validation Failed",
			details: err?.fields,
		});
	} else if (
		err instanceof EntityNotFoundError ||
		err instanceof OwnershipError ||
		err instanceof JsonWebTokenError
	) {
		res.status(401).send({
			message: "Unauthorized",
		} as OwnershipErrorJSON);
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
