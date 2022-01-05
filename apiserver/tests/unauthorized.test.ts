import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../src/index";

chai.use(chaiHttp);

describe("Unauthorized", () => {
	const baseUrl = "/";

	describe("All CRUD operations", () => {
		it("Returns 401 Unauthorized", async () => {
			const responses = [
				await chai.request(server).delete(baseUrl + "/"),
				await chai.request(server).get(baseUrl + "/"),
				await chai.request(server).post(baseUrl + "/"),
				await chai.request(server).put(baseUrl + "/"),
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
	});
});
