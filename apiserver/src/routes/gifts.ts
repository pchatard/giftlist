import express from "express";
import GiftController from "../controllers/GiftController";
import { authorize } from "../middlewares/authorize";

const gifts = express.Router();

/** Finds all gifts */
gifts.get("/", GiftController.findAll);

/** Finds all gifts from the listId list */
gifts.get("/:listId", GiftController.findGiftsFromList);

/** Finds the :giftId gift */
gifts.get("/:giftId", GiftController.findOne);

/** Creates a new gift in the listId list */
gifts.post("/:listId", authorize, GiftController.create);

/** Updates the giftId gift */
gifts.put("/:listId/:giftId", authorize, GiftController.update);

/** Toggles the favorite status of giftId gift  */
gifts.put("/:listId/:giftId/fav", authorize, GiftController.favoritize);

/** Books a gift */
gifts.put("/:listId/:giftId/book", GiftController.book);

/** Deletes the giftId gift */
gifts.delete("/:listId/:giftId", authorize, GiftController.delete);

export default gifts;
