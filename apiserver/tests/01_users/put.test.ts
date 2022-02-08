import { expect } from "chai";
import { BaseUrl_Users, GlobalVar } from "./../global";
import { expectValidationFailed } from "./../helpers/error";
import { expect204 } from "./../helpers/success";
import { get, put } from "./../helpers/crud";

export default function suite() {
	it("Returns 204 with user informations", async () => {
		const response = await put(BaseUrl_Users + "/" + GlobalVar.User1_Id, { email: "new@new.fr" });
		expect204(response);
		const changedUser = await get(BaseUrl_Users + "/" + GlobalVar.User1_Id);
		expect(changedUser)
			.to.have.property("body")
			.to.eql({ email: "new@new.fr", displayName: "TestUser1" });
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await put(BaseUrl_Users + "/" + wrongUUID);
		expectValidationFailed(response);
	});
}
