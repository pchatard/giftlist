import { expect } from "chai";

import { Url_ListGetOne, Url_ListPut } from "../global";
import { get, put } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";
import { ListGranted, ListInvited, ListOwned } from "../seeder/lists.seed";
import { castAsListDTO } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await put(Url_ListPut(ListInvited.id), {
			title: "ChangedList1",
		});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await put(Url_ListPut(ListGranted.id), {
			title: "ChangedList1",
		});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, list informations are changed, if owned", async () => {
		const response = await put(Url_ListPut(ListOwned.id), {
			title: "ChangedList1",
		});
		expect204(response);
		const changedList = await get(Url_ListGetOne(ListOwned.id));
		expect(changedList)
			.to.have.property("body")
			.to.eql({ ...castAsListDTO(ListOwned), title: "ChangedList1" });
		await put(Url_ListPut(ListOwned.id), { title: "TestList1" });
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await put(Url_ListPut(wrongUUID));
		expectValidationFailed(response);
	});
}
