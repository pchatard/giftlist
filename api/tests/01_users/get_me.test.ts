import { expect } from "chai";

import { Url_UserGetMe } from "../global/urls";
import { get } from "../helpers/crud";
import { expect200 } from "../helpers/success";
import { UserTest } from "../seeder/users.seed";

export default function suite() {
	it("Returns 200 with user informations", async () => {
		const { id, createdDate, ...user } = UserTest;
		const response = await get(Url_UserGetMe());
		expect200(response);
		expect(response).to.have.property("body").to.eql(user);
	});
}
