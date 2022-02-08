import { expect } from "chai";
import { BaseUrl_Users, GlobalVar, User2 } from "./../global";
import { expectValidationFailed } from "./../helpers/error";
import { expect204 } from "./../helpers/success";
import { del, get } from "./../helpers/crud";

export default function suite() {
	it("Returns 204 and user is no more present", async () => {
		const response = await del(BaseUrl_Users + "/" + GlobalVar.User1_Id);
		expect204(response);
		let list = await get(BaseUrl_Users + "/");
		expect(list).to.have.property("body").to.eql([User2]);
		await del(BaseUrl_Users + "/" + GlobalVar.User2_Id);
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await del(BaseUrl_Users + "/" + wrongUUID);
		expectValidationFailed(response);
	});
}
