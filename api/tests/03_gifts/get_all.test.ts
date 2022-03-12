import { expect } from "chai";

import { Url_GiftGetAll } from "../global";
import { get } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";
import { Gift1, Gift2, Gift3 } from "../seeder/gifts.seed";
import { ListGranted, ListOwned, ListUnauthorized } from "../seeder/lists.seed";
import { castArrayAsGiftDTO } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await get(Url_GiftGetAll(ListUnauthorized.id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 200, with all gifts for owner", async () => {
		const response = await get(Url_GiftGetAll(ListOwned.id));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		expect(response.body).to.have.deep.members(castArrayAsGiftDTO([Gift1, Gift2]));
	});
	it("Returns 200, with not hidden gifts for granted", async () => {
		const response = await get(Url_GiftGetAll(ListGranted.id));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		expect(response.body).to.be.deep.equal(castArrayAsGiftDTO([Gift3]));
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await get(Url_GiftGetAll(wrongUUID));
		expectValidationFailed(response);
	});
}
