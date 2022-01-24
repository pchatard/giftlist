import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { BaseUrl_NotFound, GlobalVar } from "../global";

chai.use(chaiHttp);

export default function suite() {
	it("Returns 404 Not Found", async () => {
		const responses = [
			await chai
				.request(server)
				.delete(BaseUrl_NotFound + "/")
				.set({ Authorization: `Bearer ${GlobalVar.Token}` }),
			await chai
				.request(server)
				.get(BaseUrl_NotFound + "/")
				.set({ Authorization: `Bearer ${GlobalVar.Token}` }),
			await chai
				.request(server)
				.post(BaseUrl_NotFound + "/")
				.set({ Authorization: `Bearer ${GlobalVar.Token}` }),
			await chai
				.request(server)
				.put(BaseUrl_NotFound + "/")
				.set({ Authorization: `Bearer ${GlobalVar.Token}` }),
		];
		responses.forEach((response) => {
			expect(response).to.have.property("error").to.not.eql(false);
			expect(response).to.have.status(404);
			expect(response)
				.to.have.property("body")
				.to.have.property("message")
				.to.be.eql("Not Found");
		});
	});
}
