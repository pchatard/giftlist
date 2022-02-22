import { expect } from "chai";

import { Gift1, Gift2, GlobalVar, Url_GiftGetAll } from "../global";
import { get } from "../helpers/crud";
import { expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";

export default function suite() {
	it("Returns 200, with all gifts for owner", async () => {
		const response = await get(Url_GiftGetAll(GlobalVar.List1_Id, GlobalVar.User1_Id));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		expect(response.body).to.have.deep.members([Gift1, Gift2]);
	});
	it("Returns 200, with not hidden gifts for granted", async () => {
		const response = await get(Url_GiftGetAll(GlobalVar.List1_Id, GlobalVar.User2_Id));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		expect(response.body).to.have.deep.members([Gift1]);
	});

	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await get(Url_GiftGetAll(wrongUUID, GlobalVar.User1_Id)),
			await get(Url_GiftGetAll(GlobalVar.List1_Id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
