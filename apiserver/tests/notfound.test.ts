import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import request from "request";
import server from "../src/index";

chai.use(chaiHttp);

const options = {
	url: process.env.AUTH0_TOKEN_URL as string,
	headers: { "content-type": "application/json" },
	body: JSON.stringify({
		client_id: process.env.AUTH0_CLIENT_ID,
		client_secret: process.env.AUTH0_CLIENT_SECRET,
		audience: process.env.AUTH0_AUDIENCE,
		grant_type: "client_credentials",
	}),
};

describe("NotFound", () => {
	const baseUrl = "/notfound";
	var token: string = "";

	before((done) => {
		request.post(options, function (error, _response, body) {
			if (error) throw new Error(error);
			token = JSON.parse(body)["access_token"];
			done();
		});
	});

	describe("All CRUD operations", () => {
		it("Returns 404 Not Found", async () => {
			const responses = [
				await chai
					.request(server)
					.delete(baseUrl + "/")
					.set({ Authorization: `Bearer ${token}` }),
				await chai
					.request(server)
					.get(baseUrl + "/")
					.set({ Authorization: `Bearer ${token}` }),
				await chai
					.request(server)
					.post(baseUrl + "/")
					.set({ Authorization: `Bearer ${token}` }),
				await chai
					.request(server)
					.put(baseUrl + "/")
					.set({ Authorization: `Bearer ${token}` }),
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
	});
});
