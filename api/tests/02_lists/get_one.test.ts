import { expect } from "chai";

import { GlobalVar, Url_ListGetOne } from "../global";
import { get } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";
import { List1, List2, List3 } from "../seeder/lists.seed";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await get(Url_ListGetOne(List3.id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 200 with list informations, if not owned but granted", async () => {
		const response = await get(Url_ListGetOne(List2.id));
		expect200(response);
		const { grantedUsers, owners, updatedDate, createdDate, ...list } = List2;
		expect(response).to.have.property("body").to.deep.include(list);
	});
	it("Returns 200 with list informations, if owned", async () => {
		const response = await get(Url_ListGetOne(List1.id));
		expect200(response);
		const { grantedUsers, owners, updatedDate, createdDate, ...list } = List1;
		expect(response)
			.to.have.property("body")
			.to.deep.include({ ...list, sharingCode: "" });
		GlobalVar.ListTest_SharingCode = (
			await get(Url_ListGetOne(GlobalVar.ListTest_Id))
		).body.sharingCode;
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await get(Url_ListGetOne(wrongUUID));
		expectValidationFailed(response);
	});
}
