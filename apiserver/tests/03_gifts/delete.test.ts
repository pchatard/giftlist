import { expect } from "chai";

import { Gift2, GlobalVar, Url_GiftDelete, Url_GiftGetAll } from "../global";
import { del, get } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await del(
			Url_GiftDelete(GlobalVar.List2_Id, GlobalVar.Gift3_Id, GlobalVar.User2_Id)
		);
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await del(
			Url_GiftDelete(GlobalVar.List1_Id, GlobalVar.Gift1_Id, GlobalVar.User2_Id)
		);
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if owned but gift does not belong to list", async () => {
		const response = await del(
			Url_GiftDelete(GlobalVar.List1_Id, GlobalVar.Gift3_Id, GlobalVar.User1_Id)
		);
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204 and gift is no more present", async () => {
		const response = await del(
			Url_GiftDelete(GlobalVar.List1_Id, GlobalVar.Gift1_Id, GlobalVar.User1_Id)
		);
		expect204(response);
		const gifts_List1 = await get(Url_GiftGetAll(GlobalVar.List1_Id, GlobalVar.User1_Id));
		expect(gifts_List1.body).to.have.deep.members([Gift2]);
		await del(Url_GiftDelete(GlobalVar.List1_Id, GlobalVar.Gift2_Id, GlobalVar.User1_Id));
		await del(Url_GiftDelete(GlobalVar.List2_Id, GlobalVar.Gift3_Id, GlobalVar.User1_Id));
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await del(Url_GiftDelete(wrongUUID, GlobalVar.Gift2_Id, GlobalVar.User1_Id)),
			await del(Url_GiftDelete(GlobalVar.List1_Id, wrongUUID, GlobalVar.User1_Id)),
			await del(Url_GiftDelete(GlobalVar.List1_Id, GlobalVar.Gift2_Id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
