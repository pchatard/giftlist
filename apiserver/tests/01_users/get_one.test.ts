import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { BaseUrl_Users, GlobalVar, User1 } from "../global";
import { expectValidationFailed } from "../helpers/errors";
import { expect200 } from "../helpers/success";

chai.use(chaiHttp);

export default function suite() {
	it("Returns 200 with user informations", async () => {
		const result: any = User1;
		const response = await chai
			.request(server)
			.get(BaseUrl_Users + "/" + GlobalVar.User1_Id)
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		expect200(response);
		expect(response).to.have.property("body").to.eql(result);
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await chai
			.request(server)
			.get(BaseUrl_Users + "/" + wrongUUID)
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		expectValidationFailed(response);
	});
}
