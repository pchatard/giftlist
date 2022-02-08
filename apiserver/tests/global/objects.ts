import { CreateListDTO } from "./../../build/types/dto/lists.d";
import { CreateUserDTO } from "./../../build/types/dto/users";

export const User1: CreateUserDTO = {
	email: "test1@test.fr",
	displayName: "TestUser1",
};

export const User2: CreateUserDTO = {
	email: "test2@test.fr",
	displayName: "TestUser2",
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
