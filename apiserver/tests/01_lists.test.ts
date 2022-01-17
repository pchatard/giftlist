import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import request from "request";
import server from "../src/index";
import GlobalVars from "./globalVars";

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

describe("Lists", () => {
	const baseUrl = "/lists";
	var token: string = "";

	before((done) => {
		request.post(options, function (error, _response, body) {
			if (error) throw new Error(error);
			token = JSON.parse(body)["access_token"];
			done();
		});

		GlobalVars.List1 = { title: "TestList1", ownersIds: [GlobalVars.User1_Id], isShared: false };
		GlobalVars.List2 = { title: "TestList2", ownersIds: [GlobalVars.User1_Id], isShared: true };
	});

	describe("POST /", () => {
		it("Returns 200 with ID if all data are provided", async () => {
			const responses = [
				await chai
					.request(server)
					.post(baseUrl + "/")
					.send(GlobalVars.List1)
					.set({ Authorization: `Bearer ${token}` }),
			];
			responses.forEach((response) => {
				expect(response).to.have.property("error").to.eql(false);
				expect(response).to.have.status(200);
				expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
			});
		});
	});
	describe("Final", () => {
		it("Delete User1 again (TODO: Remove)", async () => {
			const response = await chai
				.request(server)
				.delete("/users/" + GlobalVars.User1_Id)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.eql(false);
			expect(response).to.have.status(204);
		});
	});
});
