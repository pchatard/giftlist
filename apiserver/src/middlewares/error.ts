import { NextFunction, Request, Response } from "express";

interface ErrorType {
	name: string;
	message: string;
}

function errorHandler(err: ErrorType, _req: Request, res: Response, _next: NextFunction): void {
	res.status(500);
	res.json({
		name: err.name,
		message: err.message,
	});
}

export default errorHandler;
