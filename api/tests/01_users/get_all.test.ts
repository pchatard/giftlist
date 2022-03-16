import { expect } from "chai";

import { NewUserTest, Url_UserGetAll } from "../global";
import { get } from "../helpers/crud";
import { expect200 } from "../helpers/success";
import { User1, User2, UserTest } from "../seeder/users.seed";

export default function suite() {
	it("Returns 200 with all users as an array", async () => {
		const { id: id1, createdDate: createdDate1, ...user1 } = User1;
		const { id: id2, createdDate: createdDate2, ...user2 } = User2;
		const { id: idTest, createdDate: createdDateTest, ...userTest } = UserTest;
		const response = await get(Url_UserGetAll());
		expect200(response);
		expect(response)
			.to.have.property("body")
			.to.have.deep.members([user1, user2, userTest, NewUserTest]);
	});
}
