import { expect } from "chai";

import { GlobalVar, ListTest, Url_ListGetAll } from "../global";
import { get } from "../helpers/crud";
import { expect200 } from "../helpers/success";
import { List1, List2 } from "../seeder/lists.seed";

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

export default function suite() {
	it("Returns 200, with all lists", async () => {
		const response = await get(Url_ListGetAll("all"));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		const listTest = {
			...ListTest,
			id: GlobalVar.ListTest_Id,
			sharingCode: GlobalVar.ListTest_SharingCode,
		};
		expect(response.body).to.be.deep.include.members(cast([List1, List2, listTest]));
	});
	it("Returns 200, with owned lists", async () => {
		const response = await get(Url_ListGetAll("owned"));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		const listTest = {
			...ListTest,
			id: GlobalVar.ListTest_Id,
			sharingCode: GlobalVar.ListTest_SharingCode,
		};
		expect(response.body).to.be.deep.include.members(cast([List1, listTest]));
	});
	it("Returns 200, with granted lists", async () => {
		const response = await get(Url_ListGetAll("granted"));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		expect(response.body).to.be.deep.include.members(cast([List2]));
	});
}
