import { config } from "dotenv";

import { CreateGiftDTO } from "../../src/dto/gifts";
import { CreateListDTO } from "../../src/dto/lists";
import { CreateUserDTO } from "../../src/dto/users";
import { User1, UserTest } from "../seeder/users.seed";

config({ path: process.env.NODE_ENV == "dev" ? ".env.local" : ".env.test" });

export const NewUserTest: CreateUserDTO = {
	auth0Id: "newUserId",
	email: "newUserMail@test.fr",
	displayName: "Test NewUser",
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
	isHidden: false,
	isFavorite: false,
	category: "book",
};
