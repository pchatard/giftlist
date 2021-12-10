import { Request, Response } from 'express';

/**
 * Wrap an async controller function, taking Request.Body as parameter and
 * returning controller function result as JSON object with status code 200.
 * @param originalFunction the async function to call 
 * @returns the wrapped function
 */
function controllerWrap(originalFunction: (params: any) => Promise<any>) {
	return async (req: Request, res: Response) => {
		const response = await originalFunction(req.body);
		return res.status(200).json(response);
	};
}

export default controllerWrap;