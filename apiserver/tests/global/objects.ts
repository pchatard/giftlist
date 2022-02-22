import { CreateGiftDTO } from "../../src/dto/gifts";
import { CreateListDTO } from "../../src/dto/lists";
import { CreateUserDTO } from "../../src/dto/users";

export const User1: CreateUserDTO = {
	email: "test1@test.fr",
	displayName: "TestUser1",
};

export const User2: CreateUserDTO = {
	email: "test2@test.fr",
	displayName: "TestUser2",
};

export const User3: CreateUserDTO = {
	email: "test3@test.fr",
	displayName: "TestUser3",
};

export const List1: CreateListDTO = {
	title: "TestList1",
	ownersIds: [],
	grantedUsersIds: [],
	isShared: false,
};

export const List2: CreateListDTO = {
	title: "TestList2",
	ownersIds: [],
	grantedUsersIds: [],
	isShared: true,
};

export const List3: CreateListDTO = {
	title: "TestList3",
	ownersIds: [],
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
