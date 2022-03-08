import { expect } from "chai";

import { Url_UserDeleteMe, Url_UserGetAll } from "../global";
import { del, get } from "../helpers/crud";
import { expect204 } from "../helpers/success";
import { User1, User2 } from "../seeder/users.seed";

export default function suite() {
	it("Returns 204 and user is no more present", async () => {
		const { id: id1, createdDate: createdDate1, ...user1 } = User1;
		const { id: id2, createdDate: createdDate2, ...user2 } = User2;
		const response = await del(Url_UserDeleteMe());
		expect204(response);
		let list = await get(Url_UserGetAll());
		expect(list).to.have.property("body").to.eql([user1, user2]);
	});
}
