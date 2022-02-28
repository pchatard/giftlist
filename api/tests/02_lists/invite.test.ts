import { expect } from "chai";

import { GlobalVar, List1, Url_ListGetOne, Url_ListInvite } from "../global";
import { get, put } from "../helpers/crud";
import { expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 204, user is not added to grantedUser if owner", async () => {
		const response = await put(Url_ListInvite(GlobalVar.List1_SharingCode), {});
		expect204(response);
		const changedList = await get(Url_ListGetOne(GlobalVar.List1_Id));
		expect(changedList)
			.to.have.property("body")
			.to.eql({ ...List1, isShared: false, sharingCode: "" });
	});
	// TODO: Is it testable ?
	// it("Returns 204, user is added to grantedUser if not owner", async () => {
	// 	const response = await put(Url_ListInvite(GlobalVar.List3_SharingCode), {});
	// 	expect204(response);
	// 	const changedList = await get(Url_ListGetOne(GlobalVar.List3_Id));
	// 	expect(changedList)
	// 		.to.have.property("body")
	// 		.to.eql({
	// 			...List3,
	// 			grantedUsersIds: [UserTest.id],
	// 			isShared: true,
	// 			sharingCode: GlobalVar.List3_SharingCode,
	// 		});
	// });
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await put(Url_ListInvite(wrongUUID));
		expectValidationFailed(response);
	});
}
