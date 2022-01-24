import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { BaseUrl_Users, GlobalVar, User2 } from "../global";
import { expectValidationFailed } from "../helpers/errors";
import { expect204 } from "../helpers/success";

chai.use(chaiHttp);

export default function suite() {
	it("Returns 204 and user is no more present", async () => {
		const response = await chai
			.request(server)
			.delete(BaseUrl_Users + "/" + GlobalVar.User1_Id)
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		expect204(response);
		let list = await chai
			.request(server)
			.get(BaseUrl_Users + "/")
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		expect(list).to.have.property("body").to.eql([User2]);
		await chai
			.request(server)
			.delete(BaseUrl_Users + "/" + GlobalVar.User2_Id)
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		list = await chai
			.request(server)
			.get(BaseUrl_Users + "/")
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		expect(list).to.have.property("body").to.eql([]);
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await chai
			.request(server)
			.delete(BaseUrl_Users + "/" + wrongUUID)
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		expectValidationFailed(response);
	});
}
