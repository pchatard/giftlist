import { expect } from "chai";

import { Gift1, Gift2, Gift3, GlobalVar, Url_GiftGetAll } from "../global";
import { get } from "../helpers/crud";
import { expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";

export default function suite() {
	it("Returns 200, with all gifts for owner", async () => {
		const response = await get(Url_GiftGetAll(GlobalVar.List1_Id));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		expect(response.body).to.have.deep.members([Gift1, Gift2]);
	});
	it("Returns 200, with not hidden gifts for granted", async () => {
		// TODO: Not created because not owner
		const response = await get(Url_GiftGetAll(GlobalVar.List2_Id));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		expect(response.body).to.have.deep.members([Gift3]);
	});

	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await get(Url_GiftGetAll(wrongUUID));
		expectValidationFailed(response);
	});
}
