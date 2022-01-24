import User from "../../src/models/User";

export const User1: Omit<User, "id" | "friends"> = {
	email: "test1@test.fr",
	displayName: "TestUser1",
};
export const User2: Omit<User, "id" | "friends"> = {
	email: "test2@test.fr",
	displayName: "TestUser2",
};
