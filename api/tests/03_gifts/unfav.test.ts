import { expect } from "chai";

import { Url_GiftGetOne, Url_GiftUnfav } from "../global";
import { get, put } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";
import { Gift1, Gift3, Gift5 } from "../seeder/gifts.seed";
import { ListGranted, ListOwned, ListUnauthorized } from "../seeder/lists.seed";
import { castAsGiftDTO } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await put(Url_GiftUnfav(ListUnauthorized.id, Gift5.id), {
			title: "ChangedGift4",
		});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await put(Url_GiftUnfav(ListGranted.id, Gift3.id), {
			title: "ChangedGift3",
		});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if owned but gift does not belong to list", async () => {
		const response = await put(Url_GiftUnfav(ListOwned.id, Gift3.id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, if owned", async () => {
		const response = await put(Url_GiftUnfav(ListOwned.id, Gift1.id), {});
		expect204(response);
		const changedGift = await get(Url_GiftGetOne(ListOwned.id, Gift1.id));
		expect(changedGift)
			.to.have.property("body")
			.to.eql(castAsGiftDTO({ ...Gift1, isFavorite: false }));
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await put(Url_GiftUnfav(wrongUUID, Gift1.id)),
			await put(Url_GiftUnfav(ListOwned.id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
