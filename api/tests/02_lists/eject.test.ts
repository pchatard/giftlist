import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";

import { GlobalVar, Url_ListGetOne, Url_ListInvite } from "../global";
import { Url_ListEject } from "../global/urls";
import { get, put } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";
import { ListGranted, ListInvited, ListOwned } from "../seeder/lists.seed";
import { User1, UserTest } from "../seeder/users.seed";
import { castAsListDTO, ListTestWithGrantedAsList } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await put(Url_ListEject(ListInvited.id, UserTest.email), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await put(Url_ListEject(ListGranted.id, UserTest.email), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, user is not remove to grantedUser if owner", async () => {
		const response = await put(Url_ListEject(ListOwned.id, UserTest.email), {});
		expect204(response);
		const changedList = await get(Url_ListGetOne(ListOwned.id));
		expect(changedList).to.have.property("body").to.be.deep.equal(castAsListDTO(ListOwned));
	});
	it("Returns 204, user is remove from grantedUser if not owner", async () => {
		const response = await put(Url_ListEject(GlobalVar.ListTestWithGranted_Id, User1.email), {});
		expect204(response);
		const changedList = await get(Url_ListGetOne(GlobalVar.ListTestWithGranted_Id));
		expect(changedList)
			.to.have.property("body")
			.to.be.deep.equal(castAsListDTO(ListTestWithGrantedAsList({ grantedUsersDTO: [] })));
		await put(Url_ListInvite(ListInvited.sharingCode), {}); // Restore context
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const email: string = "aa@aa.aa";
		const response = await put(Url_ListEject(wrongUUID, email));
		expectValidationFailed(response);
	});
	it("Returns 422, with validation error, if path param is not email", async () => {
		const uuid: string = uuidv4();
		const wrongEmail: string = "toto";
		const response = await put(Url_ListEject(uuid, wrongEmail));
		expectValidationFailed(response);
	});
}
