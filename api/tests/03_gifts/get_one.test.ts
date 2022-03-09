import { expect } from "chai";

import { Url_GiftGetOne } from "../global";
import { get } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";
import { Gift1, Gift3, Gift5 } from "../seeder/gifts.seed";
import { ListGranted, ListOwned, ListUnauthorized } from "../seeder/lists.seed";
import { castAsGiftDTO } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await get(Url_GiftGetOne(ListUnauthorized.id, Gift5.id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 200 with list informations, if not owned but granted", async () => {
		const response = await get(Url_GiftGetOne(ListGranted.id, Gift3.id));
		expect200(response);
		expect(response).to.have.property("body").to.be.deep.equal(castAsGiftDTO(Gift3));
	});
	it("Returns 401 Unauthorized, if owned but gift does not belong to list", async () => {
		const response = await get(Url_GiftGetOne(ListOwned.id, Gift3.id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 200 with list informations, if owned", async () => {
		const response = await get(Url_GiftGetOne(ListOwned.id, Gift1.id));
		expect200(response);
		expect(response).to.have.property("body").to.be.deep.equal(castAsGiftDTO(Gift1));
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await get(Url_GiftGetOne(wrongUUID, Gift1.id)),
			await get(Url_GiftGetOne(ListOwned.id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
