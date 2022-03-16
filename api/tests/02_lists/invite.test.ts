import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";

import { Url_ListGetOne, Url_ListInvite } from "../global";
import { get, put } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";
import { ListInvited, ListOwned } from "../seeder/lists.seed";
import { UserTest } from "../seeder/users.seed";
import { castAsListDTO } from "./cast";

export default function suite() {
	it("Returns 204, user is not added to grantedUser if owner", async () => {
		const response = await put(Url_ListInvite(ListOwned.sharingCode), {});
		expect204(response);
		const changedList = await get(Url_ListGetOne(ListOwned.id));
		expect(changedList).to.have.property("body").to.be.deep.equal(castAsListDTO(ListOwned));
	});
	it("Returns 204, user is added to grantedUser if not owner", async () => {
		const response = await put(Url_ListInvite(ListInvited.sharingCode), {});
		expect204(response);
		const changedList = await get(Url_ListGetOne(ListInvited.id));
		const { ownersDTO, ...rest } = castAsListDTO(ListInvited);
		expect(changedList)
			.to.have.property("body")
			.to.deep.include({
				...rest,
				grantedUsersDTO: [{ id: UserTest.id, displayName: UserTest.displayName }],
			});
		expect(changedList)
			.to.have.property("body")
			.to.have.nested.property("ownersDTO")
			.to.include.deep.members(ownersDTO || []);
	});
	it("Returns 404, with UnvalidSharingCode error, if sharing code does not exist", async () => {
		const response = await put(Url_ListInvite(uuidv4()));
		expectError(response, 404, "Resource not found");
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await put(Url_ListInvite(wrongUUID));
		expectValidationFailed(response);
	});
}
