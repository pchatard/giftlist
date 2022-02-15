import { expect } from "chai";
import { GlobalVar, Url_ListGetOne, Url_ListInvite } from "../global";
import { get, put } from "../helpers/crud";
import { expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 204, user is not added to grantedUser if owner", async () => {
		const response = await put(
			Url_ListInvite(GlobalVar.List1_SharingCode, GlobalVar.User1_Id),
			{}
		);
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
	it("Returns 204, user is added to grantedUser if not owner", async () => {
		const response = await put(
			Url_ListInvite(GlobalVar.List1_SharingCode, GlobalVar.User3_Id),
			{}
		);
		expect204(response);
		const changedList = await get(Url_ListGetOne(GlobalVar.List1_Id, GlobalVar.User1_Id));
		expect(changedList)
			.to.have.property("body")
			.to.eql({
				title: "TestList1",
				ownersIds: [GlobalVar.User1_Id],
				grantedUsersIds: [GlobalVar.User3_Id],
				isShared: true,
				closureDate: null,
				sharingCode: GlobalVar.List1_SharingCode,
			});
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await put(Url_ListInvite(wrongUUID, GlobalVar.User1_Id)),
			await put(Url_ListInvite(GlobalVar.List1_Id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
