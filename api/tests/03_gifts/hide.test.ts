import { expect } from "chai";

import { Url_GiftGetOne, Url_GiftHide } from "../global";
import { get, put } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";
import { Gift1, Gift3 } from "../seeder/gifts.seed";
import { ListGranted, ListOwned, ListUnauthorized } from "../seeder/lists.seed";
import { castAsGiftDTO } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await put(Url_GiftHide(ListUnauthorized.id, Gift3.id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await put(Url_GiftHide(ListGranted.id, Gift3.id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if owned but gift does not belong to list", async () => {
		const response = await put(Url_GiftHide(ListOwned.id, Gift3.id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, if owned", async () => {
		const response = await put(Url_GiftHide(ListOwned.id, Gift1.id), {});
		expect204(response);
		const changedGift = await get(Url_GiftGetOne(ListOwned.id, Gift1.id));
		expect(changedGift)
			.to.have.property("body")
			.to.eql(castAsGiftDTO({ ...Gift1, isHidden: true }));
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await put(Url_GiftHide(wrongUUID, Gift1.id)),
			await put(Url_GiftHide(ListOwned.id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
