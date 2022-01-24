import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { BaseUrl_Users, GlobalVar } from "../global";
import { expectValidationFailed } from "../helpers/errors";
import { expect204 } from "../helpers/success";

chai.use(chaiHttp);

export default function suite() {
	it("Returns 204 with user informations", async () => {
		const response = await chai
			.request(server)
			.put(BaseUrl_Users + "/" + GlobalVar.User1_Id)
			.send({ email: "new@new.fr" })
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		expect204(response);
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
		expectValidationFailed(response);
	});
}
