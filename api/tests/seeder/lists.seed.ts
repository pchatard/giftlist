import { v4 as uuidv4 } from "uuid";

import List from "../../src/models/List";
import { UserTest } from "../global";
import { User1, User2 } from "./users.seed";

export const List1: List = {
	id: uuidv4(),
	title: "TestList1",
	owners: [],
	ownersIds: [UserTest.id, User1.id],
	isShared: false,
	sharingCode: uuidv4(),
	grantedUsersIds: [User2.id],
	createdDate: new Date(),
	updatedDate: new Date(),
};

export const List2: List = {
	id: uuidv4(),
	title: "TestList2",
	owners: [],
	ownersIds: [User2.id],
	isShared: true,
	sharingCode: uuidv4(),
	grantedUsersIds: [UserTest.id],
	createdDate: new Date(),
	updatedDate: new Date(),
};

export const List3: List = {
	id: uuidv4(),
	title: "TestList3",
	owners: [],
	ownersIds: [User1.id, User2.id],
	isShared: true,
	sharingCode: uuidv4(),
	grantedUsersIds: [],
	createdDate: new Date(),
	updatedDate: new Date(),
};
