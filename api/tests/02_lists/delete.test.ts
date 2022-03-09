import { expect } from "chai";

import { GlobalVar, Url_ListDelete, Url_ListGetAll } from "../global";
import { del, get } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";
import { ListGranted, ListInvited, ListOwned, ListUnauthorized } from "../seeder/lists.seed";
import { castArrayAsListDTO, ListTestAsList } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await del(Url_ListDelete(ListUnauthorized.id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, list forgotten but not deleted, if not owned but granted", async () => {
		const response = await del(Url_ListDelete(ListInvited.id));
		expect204(response);
		const lists_user = await get(Url_ListGetAll("all"));
		const list1 = {
			...ListOwned,
			grantedUsersIds: [],
		}; // As unshared
		expect(lists_user.body).to.be.deep.equal(
			castArrayAsListDTO([list1, ListGranted, ListTestAsList()])
		);
	});
	it("Returns 204 and list is no more present", async () => {
		const response = await del(Url_ListDelete(GlobalVar.ListTest_Id));
		expect204(response);
		let lists_user = await get(Url_ListGetAll("all"));
		const list1 = {
			...ListOwned,
			grantedUsersIds: [],
		}; // As unshared
		expect(lists_user.body).to.be.deep.equal(castArrayAsListDTO([list1, ListGranted]));
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await del(Url_ListDelete(wrongUUID));
		expectValidationFailed(response);
	});
}
