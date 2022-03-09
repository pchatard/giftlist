import { expect } from "chai";

import { Url_GiftDelete, Url_GiftGetAll } from "../global";
import { del, get } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";
import { Gift1, Gift2, Gift3, Gift5 } from "../seeder/gifts.seed";
import { ListGranted, ListOwned, ListUnauthorized } from "../seeder/lists.seed";
import { castArrayAsGiftDTO } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await del(Url_GiftDelete(ListUnauthorized.id, Gift5.id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await del(Url_GiftDelete(ListGranted.id, Gift3.id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if owned but gift does not belong to list", async () => {
		const response = await del(Url_GiftDelete(ListOwned.id, Gift3.id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204 and gift is no more present, if owned", async () => {
		const response = await del(Url_GiftDelete(ListOwned.id, Gift1.id));
		expect204(response);
		const gifts_List1 = await get(Url_GiftGetAll(ListOwned.id));
		expect(gifts_List1.body).to.be.deep.equal(castArrayAsGiftDTO([Gift2]));
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await del(Url_GiftDelete(wrongUUID, Gift1.id)),
			await del(Url_GiftDelete(ListOwned.id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
