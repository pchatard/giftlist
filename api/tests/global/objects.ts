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

export const GiftTest: CreateGiftDTO = {
	title: "TestGiftTest",
	isBooked: false,
	isHidden: false,
	isFavorite: false,
	category: "book",
	listId: "",
};
