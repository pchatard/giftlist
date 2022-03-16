import { v4 as uuidv4 } from "uuid";

import Gift from "../../src/models/Gift";
import { getDateFromNow } from "./helper";
import { ListGranted, ListOwned, ListUnauthorized } from "./lists.seed";

export const Gift1: Gift = {
	id: uuidv4(),
	title: "TestGift1",
	category: "book",
	isBooked: false,
	isFavorite: false,
	isHidden: false,
	listId: ListOwned.id,
	list: ListOwned,
	createdDate: getDateFromNow(-5),
	updatedDate: getDateFromNow(-5),
};

export const Gift2: Gift = {
	id: uuidv4(),
	title: "TestGift2",
	category: "clothes",
	isBooked: false,
	isFavorite: false,
	isHidden: true,
	listId: ListOwned.id,
	list: ListOwned,
	createdDate: getDateFromNow(-4),
	updatedDate: getDateFromNow(-4),
};

export const Gift3: Gift = {
	id: uuidv4(),
	title: "TestGift3",
	category: "others",
	isBooked: false,
	isFavorite: false,
	isHidden: false,
	listId: ListGranted.id,
	list: ListGranted,
	createdDate: getDateFromNow(-3),
	updatedDate: getDateFromNow(-3),
};

export const Gift4: Gift = {
	id: uuidv4(),
	title: "TestGift4",
	category: "cooking-item",
	isBooked: false,
	isFavorite: false,
	isHidden: true,
	listId: ListGranted.id,
	list: ListGranted,
	createdDate: getDateFromNow(-2),
	updatedDate: getDateFromNow(-2),
};

export const Gift5: Gift = {
	id: uuidv4(),
	title: "TestGift5",
	category: "book",
	isBooked: false,
	isFavorite: false,
	isHidden: false,
	listId: ListUnauthorized.id,
	list: ListUnauthorized,
	createdDate: getDateFromNow(-1),
	updatedDate: getDateFromNow(-1),
};
