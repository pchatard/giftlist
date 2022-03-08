import { expect } from "chai";

import { Url_ListGetOne, Url_ListInvite, UserTest } from "../global";
import { get, put } from "../helpers/crud";
import { expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";
import { List1, List3 } from "../seeder/lists.seed";
import { castAsListDTO } from "./cast";

export default function suite() {
	it("Returns 204, user is not added to grantedUser if owner", async () => {
		const response = await put(Url_ListInvite(List1.sharingCode), {});
		expect204(response);
		const changedList = await get(Url_ListGetOne(List1.id));
		expect(changedList).to.have.property("body").to.deep.equal(castAsListDTO(List1));
	});
	it("Returns 204, user is added to grantedUser if not owner", async () => {
		const response = await put(Url_ListInvite(List3.sharingCode), {});
		expect204(response);
		const changedList = await get(Url_ListGetOne(List3.id));
		expect(changedList)
			.to.have.property("body")
			.to.eql({
				...castAsListDTO(List3),
				grantedUsersIds: [UserTest.id],
			});
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await put(Url_ListInvite(wrongUUID));
		expectValidationFailed(response);
	});
}
