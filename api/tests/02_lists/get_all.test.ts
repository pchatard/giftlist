import { expect } from "chai";

import { List1, List2, Url_ListGetAll } from "../global";
import { get } from "../helpers/crud";
import { expect200 } from "../helpers/success";

export default function suite() {
	it("Returns 200, with all lists", async () => {
		const response = await get(Url_ListGetAll("all"));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		(response.body as any[]).forEach((list, index) => {
			checkListContent(list, [List1, List2], index);
		});
	});
	it("Returns 200, with owned lists", async () => {
		const response = await get(Url_ListGetAll("owned"));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		(response.body as any[]).forEach((list, index) => {
			checkListContent(list, [List1], index);
		});
	});
	it("Returns 200, with granted lists", async () => {
		const response = await get(Url_ListGetAll("granted"));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		(response.body as any[]).forEach((list, index) => {
			checkListContent(list, [List2], index);
		});
	});

	function checkListContent(list: any, result: any, index: number) {
		expect(list).to.have.property("ownersIds").to.have.members(result[index].ownersIds);
		expect(list).to.have.property("isShared").to.be.a("boolean");
		expect(list).to.have.property("sharingCode").to.be.a.string;
		expect(list).to.not.have.property("id");
		expect(list).to.not.have.property("owners");
		expect(list).to.not.have.property("grantedUsersIds");
		expect(list).to.not.have.property("grantedUsers");
		expect(list).to.not.have.property("createdDate");
		expect(list).to.not.have.property("updatedDate");
	}
}
