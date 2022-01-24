import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { BaseUrl_Unauthorized } from "../global";

chai.use(chaiHttp);

export default function suite() {
	it("Returns 401 Unauthorized", async () => {
		const responses = [
			await chai.request(server).delete(BaseUrl_Unauthorized + "/"),
			await chai.request(server).get(BaseUrl_Unauthorized + "/"),
			await chai.request(server).post(BaseUrl_Unauthorized + "/"),
			await chai.request(server).put(BaseUrl_Unauthorized + "/"),
		];
		responses.forEach((response) => {
			expect(response).to.have.property("error").to.not.eql(false);
			expect(response).to.have.status(401);
			expect(response)
				.to.have.property("body")
				.to.have.property("message")
				.to.be.eql("Unauthorized");
		});
	});
}
