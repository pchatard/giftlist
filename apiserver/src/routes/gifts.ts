import express from "express";
import GiftController from "../controllers/GiftController";

const gifts = express.Router();

/** Finds all gifts */
gifts.get("/", GiftController.findAll);

/** Finds all gifts from the listId list */
gifts.get("/:listId", GiftController.findGiftsFromList);

/** Finds the :giftId gift */
gifts.get("/:giftId", GiftController.findOne);

/** Creates a new gift in the listId list */
gifts.post("/:listId", GiftController.create);

/** Updates the giftId gift */
gifts.put("/:listId/:giftId", GiftController.update);

/** Toggles the favorite status of giftId gift  */
gifts.put("/:listId/:giftId/fav", GiftController.favoritize);

/** Books a gift */
gifts.put("/:listId/:giftId/book", GiftController.book);

/** Deletes the giftId gift */
gifts.delete("/:listId/:giftId", GiftController.delete);

export default gifts;
