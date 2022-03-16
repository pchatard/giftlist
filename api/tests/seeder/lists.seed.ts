import { v4 as uuidv4 } from "uuid";

import List from "../../src/models/List";
import { UserTest } from "../global";
import { User1, User2 } from "./users.seed";

export const ListOwned: List = {
	id: uuidv4(),
	title: "TestList1",
	owners: [{ ...UserTest, createdDate: new Date() }],
	ownersIds: [UserTest.id],
	isShared: false,
	sharingCode: uuidv4(),
	grantedUsers: [User1],
	grantedUsersIds: [User1.id],
	createdDate: new Date(),
	updatedDate: new Date(),
};

export const ListGranted: List = {
	id: uuidv4(),
	title: "TestList2",
	owners: [User2],
	ownersIds: [User2.id],
	isShared: true,
	sharingCode: uuidv4(),
	grantedUsers: [{ ...UserTest, createdDate: new Date() }],
	grantedUsersIds: [UserTest.id],
	createdDate: new Date(),
	updatedDate: new Date(),
};

export const ListGrantedButNotShared: List = {
	id: uuidv4(),
	title: "TestList2b",
	owners: [User2],
	ownersIds: [User2.id],
	isShared: false,
	sharingCode: uuidv4(),
	grantedUsers: [{ ...UserTest, createdDate: new Date() }],
	grantedUsersIds: [UserTest.id],
	createdDate: new Date(),
	updatedDate: new Date(),
};

export const ListInvited: List = {
	id: uuidv4(),
	title: "TestList3",
	owners: [User1, User2],
	ownersIds: [User1.id, User2.id],
	isShared: true,
	sharingCode: uuidv4(),
	grantedUsersIds: [],
	createdDate: new Date(),
	updatedDate: new Date(),
};

export const ListUnauthorized: List = {
	id: uuidv4(),
	title: "TestList4",
	owners: [User1],
	ownersIds: [User1.id],
	isShared: true,
	sharingCode: uuidv4(),
	grantedUsersIds: [],
	createdDate: new Date(),
	updatedDate: new Date(),
};
