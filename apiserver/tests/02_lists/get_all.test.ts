import { expect } from "chai";
import { BaseUrl_Lists, GlobalVar, List1, List2 } from "./../global";
import { expect200 } from "./../helpers/success";
import { get } from "./../helpers/crud";

export default function suite() {
	it("Returns 200 with list informations", async () => {
		const result: any = [List1, List2];
		const response = await get(BaseUrl_Lists + "?userId=" + GlobalVar.User1_Id + "&select=all");
		expect200(response);
		expect(response).to.have.property("body").to.be.an("array");
		(response.body as any[]).forEach((element, index) => {
			// TODO: Better handle
			expect(element).to.have.property("ownersIds").to.eql(result[index].ownersIds);
			expect(element).to.have.property("isShared").to.be.a("boolean");
			expect(element).to.have.property("sharingCode").to.be.a.string;
			expect(element).to.have.property("closureDate");
			expect(element).to.not.have.property("id");
			expect(element).to.not.have.property("owners");
			expect(element).to.not.have.property("grantedUsersIds");
			expect(element).to.not.have.property("grantedUsers");
			expect(element).to.not.have.property("createdDate");
			expect(element).to.not.have.property("updatedDate");
		});
	});
}
