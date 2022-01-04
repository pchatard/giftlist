import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
	if (err instanceof ValidateError) {
		res.status(422);
		res.json({
			message: "Validation Failed",
			details: err?.fields,
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
	// TODO: Test if it's really useful
	res.status(404).send({
		message: "Not Found",
	});
}
