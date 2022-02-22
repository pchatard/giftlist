import { expect } from "chai";

import { Gift1, Gift3, GlobalVar, Url_GiftGetOne } from "../global";
import { get } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await get(
			Url_GiftGetOne(GlobalVar.List2_Id, GlobalVar.Gift3_Id, GlobalVar.User2_Id)
		);
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 200 with list informations, if not owned but granted", async () => {
		const response = await get(
			Url_GiftGetOne(GlobalVar.List2_Id, GlobalVar.Gift3_Id, GlobalVar.User1_Id)
		);
		expect200(response);
		expect(response).to.have.property("body").to.deep.include(Gift3);
	});
	it("Returns 200 with list informations, if owned", async () => {
		const response = await get(
			Url_GiftGetOne(GlobalVar.List1_Id, GlobalVar.Gift1_Id, GlobalVar.User1_Id)
		);
		expect200(response);
		expect(response).to.have.property("body").to.deep.include(Gift1);
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await get(Url_GiftGetOne(wrongUUID, GlobalVar.Gift1_Id, GlobalVar.User1_Id)),
			await get(Url_GiftGetOne(GlobalVar.List1_Id, wrongUUID, GlobalVar.User1_Id)),
			await get(Url_GiftGetOne(GlobalVar.List1_Id, GlobalVar.Gift1_Id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
