import express from "express";
import ListController from "../controllers/ListController";
import { preventOwner } from "../middlewares/shared";

const lists = express.Router();

/** Finds all lists */
lists.get("/", ListController.findAll);

/** Finds all of the logged in user's lists */
lists.get("/mine", ListController.findMine);

/** Finds the listId list */
lists.get("/:listId", ListController.findOne);

/** Creates a new list */
lists.post("/", ListController.create);

/** Updates the listId list */
lists.put("/:listId", ListController.update);

/** Deletes the listId list */
lists.delete("/:listId", ListController.delete);

/** Makes a list shared */
lists.get("/:listId/share", ListController.share);

/** Finds the sharingCode shared list  */
lists.get("/shared/:sharingCode", preventOwner, ListController.findSharedList);

/** Makes a shared list private */
lists.get("/:listId/private", ListController.private);

export default lists;
