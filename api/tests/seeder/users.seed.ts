import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../src/models/User";
import { getDateFromNow } from "./helper";

config({ path: process.env.NODE_ENV == "dev" ? ".env.local" : ".env.test" });

export const UserTest: User = {
	id: uuidv4(),
	auth0Id: process.env.AUTH0_CLIENT_ID + "@clients",
	email: "testuser@test.fr",
	displayName: "Test User",
	bookings: [],
	// bookingsIds: [],
	createdDate: getDateFromNow(),
};

export const User1: User = {
	id: uuidv4(),
	auth0Id: "auth0|000000000000000000000000",
	email: "test1@test.fr",
	displayName: "TestUser1",
	bookings: [],
	// bookingsIds: [],
	createdDate: getDateFromNow(1),
};

export const User2: User = {
	id: uuidv4(),
	auth0Id: "facebook|000000000000000000000000",
	email: "test2@test.fr",
	displayName: "TestUser2",
	bookings: [],
	// bookingsIds: [],
	createdDate: getDateFromNow(2),
};
