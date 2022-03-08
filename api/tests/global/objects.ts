import { config } from "dotenv";

import { CreateGiftDTO } from "../../src/dto/gifts";
import { CreateListDTO } from "../../src/dto/lists";
import { CreateUserDTO } from "../../src/dto/users";

config({ path: process.env.NODE_ENV == "dev" ? ".env.local" : ".env.test" });

export const UserTest: CreateUserDTO = {
	id: process.env.AUTH0_CLIENT_ID + "@clients",
	email: "testuser@test.fr",
	displayName: "Test User",
};

export const ListTest: CreateListDTO = {
	title: "TestListTest",
	ownersIds: [UserTest.id],
	grantedUsersIds: [],
	isShared: true,
};

export const Gift1: CreateGiftDTO = {
	title: "TestGift1",
	category: "book",
	isBooked: false,
	isFavorite: false,
	isHidden: false,
	listId: "",
};

export const Gift2: CreateGiftDTO = {
	title: "TestGift2",
	category: "clothes",
	isBooked: false,
	isFavorite: false,
	isHidden: true,
	listId: "",
};

export const Gift3: CreateGiftDTO = {
	title: "TestGift3",
	category: "others",
	isBooked: false,
	isFavorite: false,
	isHidden: false,
	listId: "",
};

export const Gift4: CreateGiftDTO = {
	title: "TestGift4",
	category: "cooking-item",
	isBooked: false,
	isFavorite: false,
	isHidden: true,
	listId: "",
};

export const Gift5: CreateGiftDTO = {
	title: "TestGift5",
	category: "book",
	isBooked: false,
	isFavorite: false,
	isHidden: false,
	listId: "",
};
