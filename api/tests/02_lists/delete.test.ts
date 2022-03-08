import { expect } from "chai";

import { GlobalVar, ListTest, Url_ListDelete, Url_ListGetAll } from "../global";
import { del, get } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";
import { List1, List2, List3 } from "../seeder/lists.seed";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		await del(Url_ListDelete(List3.id)); // Remove due to INVITE tests
		const response = await del(Url_ListDelete(List3.id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, list forgotten but not deleted, if not owned but granted", async () => {
		const response = await del(Url_ListDelete(List2.id));
		expect204(response);
		const lists_user = await get(Url_ListGetAll("all"));
		const listTest = {
			...ListTest,
			id: GlobalVar.ListTest_Id,
			sharingCode: GlobalVar.ListTest_SharingCode,
		};
		const list1 = {
			...List1,
			grantedUsersIds: [],
		};
		expect(lists_user.body).to.be.deep.include.members(cast([list1, listTest]));
		await del(Url_ListDelete(List3.id));
	});
	it("Returns 204 and list is no more present", async () => {
		const response = await del(Url_ListDelete(List1.id));
		expect204(response);
		const lists_user = await get(Url_ListGetAll("all"));
		const listTest = {
			...ListTest,
			id: GlobalVar.ListTest_Id,
			sharingCode: GlobalVar.ListTest_SharingCode,
		};
		expect(lists_user.body).to.be.deep.include.members(cast([listTest]));
		await del(Url_ListDelete(GlobalVar.ListTest_Id));
		expect(lists_user.body).to.be.deep.include.members(cast([]));
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await del(Url_ListDelete(wrongUUID));
		expectValidationFailed(response);
	});
}

function cast(lists: any[]): any[] {
	const res: any[] = [];
	for (const list of lists) {
		const {
			grantedUsers,
			grantedUsersIds,
			owners,
			updatedDate,
			createdDate,
			sharingCode,
			...rest
		} = list as any;
		rest.sharingCode = rest.isShared ? sharingCode : "";
		res.push(rest);
	}
	return res;
}
