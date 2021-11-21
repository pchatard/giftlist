import Gift from "../services/GiftService";
import { Request, Response } from "express";

class GiftController {
	/**
	 * Sends back all the gifts in the response.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async findAll(req: Request, res: Response, next: Function) {
		try {
			const lists = await Gift.getAll(req.app.get("database"));
			res.send(lists);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Sends back all the gifts from a given list in the response.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async findGiftsFromList(req: Request, res: Response, next: Function) {
		try {
			const listItems = await Gift.getFromList(req.app.get("database"), req.params.listId);
			res.send(listItems);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Sends back in the response the gift with the giftId id.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async findOne(req: Request, res: Response, next: Function) {
		try {
			const list = await Gift.getOne(req.app.get("database"), req.params.giftId);
			res.send(list);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Creates a new gift and sends back its database representation in the response.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async create(req: Request, res: Response, next: Function) {
		try {
			const gift = {
				...req.body.gift,
				booked: false,
				created_at: Date(),
				modified_at: Date(),
			};
			const createdItem = await Gift.create(req.app.get("database"), gift);
			res.send(createdItem);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Updates a gift and sends it back in the response.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async update(req: Request, res: Response, next: Function) {
		try {
			const gift = req.body;
			const updatedItem = await Gift.update(req.app.get("database"), req.params.giftId, gift);
			res.send(updatedItem);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Toggles the favorite property of the given gift and sends back its new state in the response.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async favoritize(req: Request, res: Response, next: Function) {
		try {
			const newState = req.body.newState;
			const newFavState = await Gift.updateFavoriteState(
				req.app.get("database"),
				req.params.giftId,
				newState
			);
			res.send(newFavState);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Toggles the booked property of a gift, and sends back the updated gift in the response
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async book(req: Request, res: Response, next: Function) {
		try {
			let booked = {};
			if (req.body.booked && req.body.name) {
				// Use an object with id and name
				booked = { id: req.app.get("uid"), name: req.body.name };
			} else if (req.body.booked && !req.body.name) {
				booked = { id: req.app.get("uid") };
			}
			const updatedGift = await Gift.updateBookedState(req.app.get("database"), req.params.giftId, booked);
			res.send(updatedGift);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Deletes a gift and sends back true if it succeeds.
	 * @function
	 * @param {Request} req - Express request object
	 * @param {Response} res - Express response object
	 * @param {Function} next - Following middleware
	 */
	static async delete(req: Request, res: Response, next: Function) {
		try {
			await Gift.delete(req.app.get("database"), req.params.giftId);
			res.send(true);
		} catch (error) {
			next(error);
		}
	}
}

export default GiftController;
