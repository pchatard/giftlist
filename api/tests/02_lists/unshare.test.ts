import { expect } from "chai";

import { Url_ListGetOne, Url_ListUnshare } from "../global";
import { get, put } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";
import { List1, List2, List3 } from "../seeder/lists.seed";
import { castAsListDTO } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await put(Url_ListUnshare(List3.id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await put(Url_ListUnshare(List2.id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, if owned", async () => {
		const response = await put(Url_ListUnshare(List1.id), {});
		expect204(response);
		const changedList = await get(Url_ListGetOne(List1.id));
		expect(changedList)
			.to.have.property("body")
			.to.eql({ ...castAsListDTO(List1), grantedUsersIds: [] });
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await put(Url_ListUnshare(wrongUUID));
		expectValidationFailed(response);
	});
}
