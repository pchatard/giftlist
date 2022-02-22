import { expect } from "chai";

import { Url_UserGetAll, User1, User2 } from "../global";
import { get } from "../helpers/crud";
import { expect200 } from "../helpers/success";

export default function suite() {
	it("Returns 200 with all users as an array", async () => {
		const response = await get(Url_UserGetAll());
		expect200(response);
		expect(response).to.have.property("body").to.eql([User1, User2]);
	});
}
