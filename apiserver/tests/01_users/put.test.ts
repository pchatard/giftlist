import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { BaseUrl_Users, GlobalVar } from "../global";

chai.use(chaiHttp);

export default function suite() {
	it("Returns 204 with user informations", async () => {
		const response = await chai
			.request(server)
			.put(BaseUrl_Users + "/" + GlobalVar.User1_Id)
			.send({ email: "new@new.fr" })
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		expect(response).to.have.property("error").to.eql(false);
		expect(response).to.have.status(204);
		const changedUser = await chai
			.request(server)
			.get(BaseUrl_Users + "/" + GlobalVar.User1_Id)
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		expect(changedUser)
			.to.have.property("body")
			.to.eql({ email: "new@new.fr", displayName: "TestUser1" });
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await chai
			.request(server)
			.put(BaseUrl_Users + "/" + wrongUUID)
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
