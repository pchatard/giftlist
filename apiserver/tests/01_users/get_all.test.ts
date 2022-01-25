import "mocha";
import { expect } from "chai";
import { BaseUrl_Users, User1, User2 } from "../global";
import { expect200 } from "../helpers/success";
import { get } from "../helpers/crud";

export default function suite() {
	it("Returns 200 with all users as an array", async () => {
		const response = await get(BaseUrl_Users + "/");
		expect200(response);
		expect(response).to.have.property("body").to.eql([User1, User2]);
	});
}
