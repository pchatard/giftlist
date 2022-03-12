import { expect } from "chai";

import { Url_GiftBook, Url_GiftGetOne } from "../global";
import { get, put } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";
import { Gift1, Gift3 } from "../seeder/gifts.seed";
import { ListGranted, ListOwned, ListUnauthorized } from "../seeder/lists.seed";
import { castAsGiftDTO } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await put(Url_GiftBook(ListUnauthorized.id, Gift3.id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, if not owned but granted", async () => {
		const response = await put(Url_GiftBook(ListGranted.id, Gift3.id), {});
		expect204(response);
		const changedGift = await get(Url_GiftGetOne(ListGranted.id, Gift3.id));
		expect(changedGift)
			.to.have.property("body")
			.to.eql(castAsGiftDTO({ ...Gift3, isBooked: true }, true));
	});
	it("Returns 401 Unauthorized, if owned but gift does not belong to list", async () => {
		const response = await put(Url_GiftBook(ListOwned.id, Gift3.id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if owned", async () => {
		const response = await put(Url_GiftBook(ListOwned.id, Gift1.id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await put(Url_GiftBook(wrongUUID, Gift1.id)),
			await put(Url_GiftBook(ListOwned.id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
