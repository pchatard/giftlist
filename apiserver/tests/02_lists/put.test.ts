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
	it("Returns 204 with list informations, if owned", async () => {
		const response = await put(Url_ListPut(GlobalVar.List1_Id, GlobalVar.User1_Id), {
			title: "ChangedList1",
		});
		expect204(response);
		const changedUser = await get(Url_ListGetOne(GlobalVar.List1_Id, GlobalVar.User1_Id));
		delete changedUser.body.sharingCode;
		expect(changedUser)
			.to.have.property("body")
			.to.eql({
				title: "ChangedList1",
				ownersIds: [GlobalVar.User1_Id],
				grantedUsersIds: [],
				isShared: false,
				closureDate: null,
			});
		await put(Url_ListPut(GlobalVar.List1_Id, GlobalVar.User1_Id), { title: "TestList1" });
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await put(Url_ListPut(wrongUUID));
		expectValidationFailed(response);
	});
}
