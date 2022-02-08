import { expect } from "chai";
import { BaseUrl_Users, GlobalVar, User1 } from "./../global";
import { expectValidationFailed } from "./../helpers/error";
import { expect200 } from "./../helpers/success";
import { get } from "./../helpers/crud";

export default function suite() {
	it("Returns 200 with user informations", async () => {
		const response = await get(BaseUrl_Users + "/" + GlobalVar.User1_Id);
		expect200(response);
		expect(response).to.have.property("body").to.eql(User1);
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await get(BaseUrl_Users + "/" + wrongUUID);
		expectValidationFailed(response);
	});
}
