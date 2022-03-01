import { expect } from "chai";

import { GlobalVar, Url_GiftGetOne, Url_GiftUnbook } from "../global";
import { Gift1 } from "../global/objects";
import { get, put } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await put(Url_GiftUnbook(GlobalVar.List3_Id, GlobalVar.Gift4_Id), {
			title: "ChangedGift4",
		});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await put(Url_GiftUnbook(GlobalVar.List2_Id, GlobalVar.Gift3_Id), {
			title: "ChangedGift3",
		});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if owned but gift does not belong to list", async () => {
		const response = await put(Url_GiftUnbook(GlobalVar.List1_Id, GlobalVar.Gift3_Id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, if owned", async () => {
		const response = await put(Url_GiftUnbook(GlobalVar.List1_Id, GlobalVar.Gift1_Id), {});
		expect204(response);
		const changedGift = await get(Url_GiftGetOne(GlobalVar.List1_Id, GlobalVar.Gift1_Id));
		expect(changedGift)
			.to.have.property("body")
			.to.eql({ ...Gift1, isBooked: false });
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await put(Url_GiftUnbook(wrongUUID, GlobalVar.Gift2_Id)),
			await put(Url_GiftUnbook(GlobalVar.List1_Id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
