import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import request from "request";
import server from "../src/index";
import MailAlreadyUsedError from "../src/errors/UserErrors/MailAlreadyUsedError";
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

describe("Users", () => {
	const baseUrl = "/users";
	var token: string = "";

	GlobalVars.User1 = { email: "test1@test.fr", displayName: "TestUser1" };
	GlobalVars.User2 = { email: "test2@test.fr", displayName: "TestUser2" };

	before((done) => {
		request.post(options, function (error, _response, body) {
			if (error) throw new Error(error);
			token = JSON.parse(body)["access_token"];
			done();
		});
	});

	describe("POST /", () => {
		it("Returns 200 with ID if all data are provided", async () => {
			const responses = [
				await chai
					.request(server)
					.post(baseUrl + "/")
					.send(GlobalVars.User1)
					.set({ Authorization: `Bearer ${token}` }),
				await chai
					.request(server)
					.post(baseUrl + "/")
					.send(GlobalVars.User2)
					.set({ Authorization: `Bearer ${token}` }),
			];
			responses.forEach((response, index) => {
				expect(response).to.have.property("error").to.eql(false);
				expect(response).to.have.status(200);
				expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
				if (index == 0) GlobalVars.User1_Id = response.body.id;
				if (index == 1) GlobalVars.User2_Id = response.body.id;
			});
		});
		it("Returns 500, with custom error, if email is already used", async () => {
			const error = new MailAlreadyUsedError();
			const errorReturned = { name: error.name, message: error.message };
			const response = await chai
				.request(server)
				.post(baseUrl + "/")
				.send(GlobalVars.User1)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.not.eql(false);
			expect(response).to.have.status(500);
			expect(response).to.have.property("body").to.be.deep.equal(errorReturned);
		});
		it("Returns 422, with validation error, if email is malformed", async () => {
			const responses = [
				await chai
					.request(server)
					.post(baseUrl + "/")
					.send({ email: "test", displayName: "TestUser2" })
					.set({ Authorization: `Bearer ${token}` }),
				await chai
					.request(server)
					.post(baseUrl + "/")
					.send({ email: "test@test", displayName: "TestUser2" })
					.set({ Authorization: `Bearer ${token}` }),
			];
			responses.forEach((response) => {
				expect(response).to.have.property("error").to.not.eql(false);
				expect(response).to.have.status(422);
				expect(response)
					.to.have.property("body")
					.to.have.property("message")
					.to.be.eql("Validation Failed");
				expect(response).to.have.property("body").to.have.property("details").to.be.not.null;
			});
		});
		it("Returns 422, with validation error, if one of fields is empty", async () => {
			const responses = [
				await chai
					.request(server)
					.post(baseUrl + "/")
					.send({ displayName: "TestUser2" })
					.set({ Authorization: `Bearer ${token}` }),
				,
				await chai
					.request(server)
					.post(baseUrl + "/")
					.send({ email: "test@test" })
					.set({ Authorization: `Bearer ${token}` }),
				,
			];
			responses.forEach((response) => {
				expect(response).to.have.property("error").to.not.eql(false);
				expect(response).to.have.status(422);
				expect(response)
					.to.have.property("body")
					.to.have.property("message")
					.to.be.eql("Validation Failed");
				expect(response).to.have.property("body").to.have.property("details").to.be.not.null;
			});
		});
	});
	describe("GET /", () => {
		it("Returns 200 with all users as an array", async () => {
			const result: any = [GlobalVars.User1, GlobalVars.User2];
			const response = await chai
				.request(server)
				.get(baseUrl + "/")
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.eql(false);
			expect(response).to.have.status(200);
			expect(response).to.have.property("body").to.eql(result);
		});
	});
	describe("GET /:userId", () => {
		it("Returns 200 with user informations", async () => {
			const result: any = GlobalVars.User1;
			const response = await chai
				.request(server)
				.get(baseUrl + "/" + GlobalVars.User1_Id)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.eql(false);
			expect(response).to.have.status(200);
			expect(response).to.have.property("body").to.eql(result);
		});
		it("Returns 422, with validation error, if path param is not UUID", async () => {
			const wrongUUID: string = "toto";
			const response = await chai
				.request(server)
				.get(baseUrl + "/" + wrongUUID)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.not.eql(false);
			expect(response).to.have.status(422);
			expect(response)
				.to.have.property("body")
				.to.have.property("message")
				.to.be.eql("Validation Failed");
			expect(response).to.have.property("body").to.have.property("details").to.be.not.null;
		});
	});
	describe("PUT /:userId", () => {
		it("Returns 204 with user informations", async () => {
			const updated = { email: "new@new.fr" };
			const response = await chai
				.request(server)
				.put(baseUrl + "/" + GlobalVars.User1_Id)
				.send(updated)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.eql(false);
			expect(response).to.have.status(204);
			const changedUser = await chai
				.request(server)
				.get(baseUrl + "/" + GlobalVars.User1_Id)
				.set({ Authorization: `Bearer ${token}` });
			expect(changedUser)
				.to.have.property("body")
				.to.eql({ ...GlobalVars.User1, ...updated });
		});
		it("Returns 422, with validation error, if path param is not UUID", async () => {
			const wrongUUID: string = "toto";
			const response = await chai
				.request(server)
				.put(baseUrl + "/" + wrongUUID)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.not.eql(false);
			expect(response).to.have.status(422);
			expect(response)
				.to.have.property("body")
				.to.have.property("message")
				.to.be.eql("Validation Failed");
			expect(response).to.have.property("body").to.have.property("details").to.be.not.null;
		});
	});
	describe("DELETE /:userId", () => {
		it("Returns 204 and user is no more present", async () => {
			const response = await chai
				.request(server)
				.delete(baseUrl + "/" + GlobalVars.User1_Id)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.eql(false);
			expect(response).to.have.status(204);
			let list = await chai
				.request(server)
				.get(baseUrl + "/")
				.set({ Authorization: `Bearer ${token}` });
			expect(list).to.have.property("body").to.eql([GlobalVars.User2]);
			await chai
				.request(server)
				.delete(baseUrl + "/" + GlobalVars.User2_Id)
				.set({ Authorization: `Bearer ${token}` });
			list = await chai
				.request(server)
				.get(baseUrl + "/")
				.set({ Authorization: `Bearer ${token}` });
			expect(list).to.have.property("body").to.eql([]);
		});
		it("Returns 422, with validation error, if path param is not UUID", async () => {
			const wrongUUID: string = "toto";
			const response = await chai
				.request(server)
				.delete(baseUrl + "/" + wrongUUID)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.not.eql(false);
			expect(response).to.have.status(422);
			expect(response)
				.to.have.property("body")
				.to.have.property("message")
				.to.be.eql("Validation Failed");
			expect(response).to.have.property("body").to.have.property("details").to.be.not.null;
		});
	});
	describe("Final", () => {
		it("Recreate User1 for further test (TODO: Remove)", async () => {
			const response = await chai
				.request(server)
				.post(baseUrl + "/")
				.send(GlobalVars.User1)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.eql(false);
			expect(response).to.have.status(200);
			expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
			GlobalVars.User1_Id = response.body.id;
		});
	});
});
