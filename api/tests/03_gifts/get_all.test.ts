import { expect } from "chai";

import { GiftTest, GlobalVar, Url_GiftGetAll } from "../global";
import { get } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";
import { Gift3 } from "../seeder/gifts.seed";
import { ListGranted, ListUnauthorized } from "../seeder/lists.seed";
import { castArrayAsGiftDTO } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await get(Url_GiftGetAll(ListUnauthorized.id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 200, with all gifts for owner", async () => {
		const response = await get(Url_GiftGetAll(GlobalVar.ListTest_Id));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		const giftTest = { ...GiftTest, id: GlobalVar.GiftTest_Id, listId: GlobalVar.ListTest_Id };
		expect(response.body).to.have.deep.members([giftTest]);
	});
	it("Returns 200, with not hidden gifts for granted", async () => {
		const response = await get(Url_GiftGetAll(ListGranted.id));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		expect(response.body).to.be.deep.equal(castArrayAsGiftDTO([Gift3], true));
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await get(Url_GiftGetAll(wrongUUID));
		expectValidationFailed(response);
	});
}
