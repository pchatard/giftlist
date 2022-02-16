import { expect } from "chai";

import { GlobalVar, Url_UserGetOne, Url_UserPut } from "../global";
import { get, put } from "../helpers/crud";
import { expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 204, user informations are changed", async () => {
		const response = await put(Url_UserPut(GlobalVar.User1_Id), { email: "new@new.fr" });
		expect204(response);
		const changedUser = await get(Url_UserGetOne(GlobalVar.User1_Id));
		expect(changedUser)
			.to.have.property("body")
			.to.eql({ email: "new@new.fr", displayName: "TestUser1" });
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await put(Url_UserPut(wrongUUID));
		expectValidationFailed(response);
	});
}
