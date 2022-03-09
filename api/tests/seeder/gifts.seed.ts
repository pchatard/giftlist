import { v4 as uuidv4 } from "uuid";

import Gift from "../../src/models/Gift";
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
	createdDate: new Date(),
	updatedDate: new Date(),
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
	createdDate: new Date(),
	updatedDate: new Date(),
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
	createdDate: new Date(),
	updatedDate: new Date(),
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
	createdDate: new Date(),
	updatedDate: new Date(),
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
	createdDate: new Date(),
	updatedDate: new Date(),
};
