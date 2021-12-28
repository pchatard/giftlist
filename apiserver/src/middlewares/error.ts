import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
	// TODO: Test if it's really useful
	if (err instanceof ValidateError) {
		console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
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
