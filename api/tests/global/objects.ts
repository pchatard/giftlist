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

export const User1: CreateUserDTO = {
	id: "auth0|000000000000000000000000",
	email: "test1@test.fr",
	displayName: "TestUser1",
};

export const User2: CreateUserDTO = {
	id: "facebook|000000000000000000000000",
	email: "test2@test.fr",
	displayName: "TestUser2",
};

export const User3: CreateUserDTO = {
	id: "google|000000000000000000000000",
	email: "test3@test.fr",
	displayName: "TestUser3",
};

export const List1: CreateListDTO = {
	title: "TestList1",
	ownersIds: [UserTest.id, User1.id],
	grantedUsersIds: [],
	isShared: false,
};

export const List2: CreateListDTO = {
	title: "TestList2",
	ownersIds: [User1.id],
	grantedUsersIds: [UserTest.id, User2.id],
	isShared: true,
};

export const List3: CreateListDTO = {
	title: "TestList3",
	ownersIds: [User2.id],
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
