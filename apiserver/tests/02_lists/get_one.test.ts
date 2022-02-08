import { expect } from "chai";
import { BaseUrl_Lists, GlobalVar, List1, List2 } from "./../global";
import { get } from "./../helpers/crud";
import { expectError } from "./../helpers/error";
import { expect200 } from "./../helpers/success";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await get(
			BaseUrl_Lists + "/" + GlobalVar.List1_Id + "?userId=" + GlobalVar.User2_Id
		);
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 200 with list informations, if not owned but granted", async () => {
		const response = await get(
			BaseUrl_Lists + "/" + GlobalVar.List2_Id + "?userId=" + GlobalVar.User2_Id
		);
		expect200(response);
		expect(response).to.have.property("body").to.deep.include(List2);
		expect(response).to.have.property("body").to.have.property("sharingCode").to.be.a.string;
	});
	it("Returns 200 with list informations, if owned", async () => {
		const response = await get(
			BaseUrl_Lists + "/" + GlobalVar.List1_Id + "?userId=" + GlobalVar.User1_Id
		);
		expect200(response);
		expect(response).to.have.property("body").to.deep.include(List1);
		expect(response).to.have.property("body").to.have.property("sharingCode").to.be.a.string;
		expect(response).to.have.property("body").to.have.property("closureDate");
	});
}
