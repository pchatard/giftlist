import { expect } from "chai";

import { GlobalVar, Url_ListGetOne, Url_ListUnshare } from "../global";
import { get, put } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await put(Url_ListUnshare(GlobalVar.List1_Id, GlobalVar.User2_Id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await put(Url_ListUnshare(GlobalVar.List2_Id, GlobalVar.User2_Id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, if owned", async () => {
		const response = await put(Url_ListUnshare(GlobalVar.List1_Id, GlobalVar.User1_Id), {});
		expect204(response);
		const changedList = await get(Url_ListGetOne(GlobalVar.List1_Id, GlobalVar.User1_Id));
		expect(changedList)
			.to.have.property("body")
			.to.eql({
				title: "TestList1",
				ownersIds: [GlobalVar.User1_Id],
				grantedUsersIds: [],
				isShared: false,
				closureDate: null,
				sharingCode: "",
			});
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await put(Url_ListUnshare(wrongUUID, GlobalVar.User1_Id)),
			await put(Url_ListUnshare(GlobalVar.List1_Id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
