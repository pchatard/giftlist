import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { BaseUrl_Users, GlobalVar, User2 } from "../global";

chai.use(chaiHttp);

export default function suite() {
	it("Returns 204 and user is no more present", async () => {
		const response = await chai
			.request(server)
			.delete(BaseUrl_Users + "/" + GlobalVar.User1_Id)
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		expect(response).to.have.property("error").to.eql(false);
		expect(response).to.have.status(204);
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
		expect(response).to.have.property("error").to.not.eql(false);
		expect(response).to.have.status(422);
		expect(response)
			.to.have.property("body")
			.to.have.property("message")
			.to.be.eql("Validation Failed");
		expect(response).to.have.property("body").to.have.property("details").to.be.not.null;
	});
}
