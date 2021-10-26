import { Request, Response } from "express";

interface ErrorType {
    name: string,
    message: string
}

function errorHandler(err: ErrorType, _req: Request, res: Response, _next: Function): void {
    res.status(200).send({
        err: {
            name: err.name,
            message: err.message,
        },
    });
}

export default errorHandler;
