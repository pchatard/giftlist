import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { BaseUrl_Users, GlobalVar, User1, User2 } from "../global";
import { expect200 } from "../helpers/success";

chai.use(chaiHttp);

export default function suite() {
	it("Returns 200 with all users as an array", async () => {
		const result: any = [User1, User2];
		const response = await chai
			.request(server)
			.get(BaseUrl_Users + "/")
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		expect200(response);
		expect(response).to.have.property("body").to.eql(result);
	});
}
