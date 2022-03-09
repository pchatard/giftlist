import { expect } from "chai";

import { GlobalVar, Url_ListGetOne } from "../global";
import { get } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";
import { ListGranted, ListInvited, ListOwned } from "../seeder/lists.seed";
import { castAsListDTO } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await get(Url_ListGetOne(ListInvited.id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 200 with list informations, if not owned but granted", async () => {
		const response = await get(Url_ListGetOne(ListGranted.id));
		expect200(response);
		expect(response).to.have.property("body").to.be.deep.equal(castAsListDTO(ListGranted));
	});
	it("Returns 200 with list informations, if owned", async () => {
		const response = await get(Url_ListGetOne(ListOwned.id));
		expect200(response);
		expect(response).to.have.property("body").to.be.deep.equal(castAsListDTO(ListOwned));
		GlobalVar.ListTest_SharingCode = (
			await get(Url_ListGetOne(GlobalVar.ListTest_Id))
		).body.sharingCode;
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await get(Url_ListGetOne(wrongUUID));
		expectValidationFailed(response);
	});
}
