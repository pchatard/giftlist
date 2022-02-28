import { expect } from "chai";

import { GlobalVar, List1, Url_ListGetOne, Url_ListShare } from "../global";
import { get, put } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await put(Url_ListShare(GlobalVar.List3_Id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await put(Url_ListShare(GlobalVar.List2_Id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, if owned", async () => {
		const response = await put(Url_ListShare(GlobalVar.List1_Id), {});
		expect204(response);
		const changedList = await get(Url_ListGetOne(GlobalVar.List1_Id));
		GlobalVar.List1_SharingCode = changedList.body.sharingCode;
		expect(changedList)
			.to.have.property("body")
			.to.eql({ ...List1, isShared: true, sharingCode: GlobalVar.List1_SharingCode });
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await put(Url_ListShare(wrongUUID));
		expectValidationFailed(response);
	});
}
