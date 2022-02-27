import { expect } from "chai";

import { Url_UserGetAll, User1, User2, UserTest } from "../global";
import { get } from "../helpers/crud";
import { expect200 } from "../helpers/success";

export default function suite() {
	it("Returns 200 with all users as an array", async () => {
		const { id: id0, ...user0 } = UserTest;
		const { id: id1, ...user1 } = User1;
		const { id: id2, ...user2 } = User2;
		const response = await get(Url_UserGetAll());
		expect200(response);
		expect(response).to.have.property("body").to.eql([user0, user1, user2]);
	});
}
