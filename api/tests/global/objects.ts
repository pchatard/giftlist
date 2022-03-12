import { config } from "dotenv";

import { CreateGiftDTO } from "../../src/dto/gifts";
import { CreateListDTO } from "../../src/dto/lists";
import { CreateUserDTO } from "../../src/dto/users";
import { User1 } from "../seeder/users.seed";

config({ path: process.env.NODE_ENV == "dev" ? ".env.local" : ".env.test" });

export const NewUserTest: CreateUserDTO = {
	id: "newUserId",
	email: "newUserMail@test.fr",
	displayName: "Test NewUser",
};

export const UserTest: CreateUserDTO = {
	id: process.env.AUTH0_CLIENT_ID + "@clients",
	email: "testuser@test.fr",
	displayName: "Test User",
};

export const ListTest: CreateListDTO = {
	title: "TestListTest",
	ownersIds: [UserTest.id],
	isShared: true,
};

export const ListTestWithGranted: CreateListDTO = {
	title: "TestListTest",
	ownersIds: [UserTest.id],
	grantedUsersIds: [User1.id],
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
