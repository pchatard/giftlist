import { expect } from "chai";

import { GlobalVar, Url_ListGetOne, Url_ListPut } from "../global";
import { get, put } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await put(Url_ListPut(GlobalVar.List1_Id, GlobalVar.User2_Id), {
			title: "ChangedList1",
		});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await put(Url_ListPut(GlobalVar.List2_Id, GlobalVar.User2_Id), {
			title: "ChangedList1",
		});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, list informations are changed, if owned", async () => {
		const response = await put(Url_ListPut(GlobalVar.List1_Id, GlobalVar.User1_Id), {
			title: "ChangedList1",
		});
		expect204(response);
		const changedList = await get(Url_ListGetOne(GlobalVar.List1_Id, GlobalVar.User1_Id));
		expect(changedList)
			.to.have.property("body")
			.to.eql({
				title: "ChangedList1",
				ownersIds: [GlobalVar.User1_Id],
				grantedUsersIds: [],
				isShared: false,
				sharingCode: GlobalVar.List1_SharingCode,
			});
		await put(Url_ListPut(GlobalVar.List1_Id, GlobalVar.User1_Id), { title: "TestList1" });
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await put(Url_ListPut(wrongUUID, GlobalVar.User1_Id)),
			await put(Url_ListPut(GlobalVar.List1_Id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
