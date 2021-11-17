import { v4 as uuidv4 } from "uuid";
import List from "../services/ListService";
import User from "../services/UserService";

import { checkListNameAvailability } from "../helpers/lists";

import ListNameAlreadyUsedError from "../errors/ListErrors/ListNameAlreadyUsedError";
import { Request, Response } from "express";

class ListController {
	/**
	 * Sends back in the response all the lists.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async findAll(req: Request, res: Response, next: Function) {
		try {
			const lists = await List.getAll(req.database);
			res.send(lists);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Sends back in the response the lists owned by and shared with the logged in user.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 */
	static async findMine(req: Request, res: Response): Promise<void> {
		const { mine, shared } = (await List.getMine(req.database, req.uid || "")) as {
			mine: string;
			shared: string;
		};
		res.status(200).send({ mine: mine, shared: shared });
	}

	/**
	 * Sends back a list in the response based on its id.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async findOne(req: Request, res: Response, next: Function) {
		try {
			const list = await List.getOne(req.database, req.params.listId);
			res.send(list);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Creates a new list and sends its database representation back in the response.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async create(req: Request, res: Response, next: Function) {
		try {
			const { displayName } = await User.getOne(req.database, req.uid || "");

			if (!(await checkListNameAvailability(req.database, req.uid || "", req.body.name))) {
				throw new ListNameAlreadyUsedError();
			}

			const list = {
				name: req.body.name,
				created_at: Date(),
				modified_at: Date(),
				ownerId: req.uid,
				owner: displayName,
				public: false,
			};
			const createdList = await List.create(req.database, list);
			res.send(createdList);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Updates a list and sends it back in the response.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static update(req: Request, res: Response, next: Function) {
		try {
			if (!checkListNameAvailability(req.database, req.uid || "", req.body.name)) {
				throw new ListNameAlreadyUsedError();
			}

			const updatedList = List.update(req.database, req.params.listId, req.body.name);
			res.send(updatedList);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Deletes a list and sends back the user's lists in the response.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async delete(req: Request, res: Response, next: Function) {
		try {
			await List.delete(req.database, req.params.listId);
			await ListController.findMine(req, res);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Creates a sharing code for a list to make it public.
	 * Sends back the list in the response.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async share(req: Request, res: Response, next: Function) {
		try {
			// Get the list ID.
			const listId = req.params.listId;
			const currentList = (await List.getOne(req.database, listId)) as { sharingCode: string };
			let code = currentList.sharingCode;
			if (!code) {
				code = uuidv4();
			}
			// Add them to the list in DB
			const list = await List.share(req.database, listId, code);
			// Return
			res.send({ list });
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Makes a list private.
	 * Sends back the list in the response.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async private(req: Request, res: Response, next: Function) {
		try {
			const listId = req.params.listId;
			const privateList = await List.private(req.database, listId);
			res.send({ list: privateList });
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Sends back a list in the response based on its sharing code.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async findSharedList(req: Request, res: Response, next: Function) {
		try {
			// Retrieve the list from the sharing code
			const sharedList = (await List.getSharedList(req.database, req.params.sharingCode)) as {
				id: string;
				sharedWith: Array<any>;
			};

			// Add the user to the list's sharedWith property if not already done
			if (!sharedList.sharedWith.includes(req.uid)) {
				List.addUserToList(req.database, req.uid || "", sharedList.id);
			}

			res.send(sharedList);
		} catch (error) {
			next(error);
		}
	}
}

export default ListController;
