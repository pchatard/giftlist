import { expect } from "chai";
import { GlobalVar, List1, List2, List3, Url_ListGetAll } from "./../global";
import { expect200 } from "./../helpers/success";
import { get } from "./../helpers/crud";

export default function suite() {
	// TODO: Test SELECT option
	it("Returns 200 with list informations", async () => {
		const result: any = [List1, List2, List3];
		const response = await get(Url_ListGetAll(GlobalVar.User1_Id, "all"));
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		(response.body as any[]).forEach((element, index) => {
			// TODO: Better handle
			expect(element).to.have.property("ownersIds").to.have.members(result[index].ownersIds);
			expect(element).to.have.property("isShared").to.be.a("boolean");
			expect(element).to.have.property("sharingCode").to.be.a.string;
			expect(element).to.not.have.property("id");
			expect(element).to.not.have.property("owners");
			expect(element).to.not.have.property("grantedUsersIds");
			expect(element).to.not.have.property("grantedUsers");
			expect(element).to.not.have.property("createdDate");
			expect(element).to.not.have.property("updatedDate");
		});
	});
}
