import { expect } from "chai";

import { GlobalVar, Url_UserDelete, Url_UserGetAll, User2 } from "../global";
import { del, get } from "../helpers/crud";
import { expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 204 and user is no more present", async () => {
		const response = await del(Url_UserDelete(GlobalVar.User1_Id));
		expect204(response);
		let list = await get(Url_UserGetAll());
		expect(list).to.have.property("body").to.eql([User2]);
		await del(Url_UserDelete(GlobalVar.User2_Id));
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await del(Url_UserDelete(wrongUUID));
		expectValidationFailed(response);
	});
}
