import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import request from "request";
import server from "../src/index";
import FieldIsMissingError from "../src/errors/FieldIsMissingError";
import MailAlreadyUsedError from "../src/errors/UserErrors/MailAlreadyUsedError";
import MailIsInvalidError from "../src/errors/UserErrors/MailIsInvalidError";
import { User } from "./../src/models/User";
import NotUUIDError from "../src/errors/NotUUID";

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

	const User1: Omit<User, "id" | "friends"> = { email: "test1@test.fr", displayName: "TestUser1" };
	const User2: Omit<User, "id" | "friends"> = { email: "test2@test.fr", displayName: "TestUser2" };
	var User1_Id: string = "";

	before((done) => {
		request.post(options, function (error, _response, body) {
			if (error) throw new Error(error);
			token = JSON.parse(body)["access_token"];
			done();
		});
	});

	describe("PUT /", () => {
		it("Returns 200 with ID if all data are provided", async () => {
			const responses = [
				await chai
					.request(server)
					.put(baseUrl + "/")
					.send(User1)
					.set({ Authorization: `Bearer ${token}` }),
				await chai
					.request(server)
					.put(baseUrl + "/")
					.send(User2)
					.set({ Authorization: `Bearer ${token}` }),
			];
			responses.forEach((response, index) => {
				expect(response).to.have.property("error").to.eql(false);
				expect(response).to.have.status(200);
				expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
				if (index == 0) User1_Id = response.body.id;
			});
		});
		it("Returns 500, with custom error, if email is already used", async () => {
			const error = new MailAlreadyUsedError();
			const errorReturned = { name: error.name, message: error.message };
			const response = await chai
				.request(server)
				.put(baseUrl + "/")
				.send(User1)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.not.eql(false);
			expect(response).to.have.status(500);
			expect(response).to.have.property("body").to.be.deep.equal(errorReturned);
		});
		it("Returns 500, with custom error, if email is malformed", async () => {
			const error = new MailIsInvalidError();
			const errorReturned = { name: error.name, message: error.message };
			const responses = [
				await chai
					.request(server)
					.put(baseUrl + "/")
					.send({ email: "test", displayName: "TestUser2" })
					.set({ Authorization: `Bearer ${token}` }),
				await chai
					.request(server)
					.put(baseUrl + "/")
					.send({ email: "test@test", displayName: "TestUser2" })
					.set({ Authorization: `Bearer ${token}` }),
				await chai
					.request(server)
					.put(baseUrl + "/")
					.send({ email: "test@15483.cdc.d", displayName: "TestUser2" })
					.set({ Authorization: `Bearer ${token}` }),
			];
			responses.forEach((response) => {
				expect(response).to.have.property("error").to.not.eql(false);
				expect(response).to.have.status(500);
				expect(response).to.have.property("body").to.be.deep.equal(errorReturned);
			});
		});
		it("Returns 500, with custom error, if one of fields is empty", async () => {
			const responses = [
				{
					error: new FieldIsMissingError("email"),
					response: await chai
						.request(server)
						.put(baseUrl + "/")
						.send({ displayName: "TestUser2" })
						.set({ Authorization: `Bearer ${token}` }),
				},
				{
					error: new FieldIsMissingError("displayName"),
					response: await chai
						.request(server)
						.put(baseUrl + "/")
						.send({ email: "test@test" })
						.set({ Authorization: `Bearer ${token}` }),
				},
			];
			responses.forEach(({ error, response }) => {
				const errorReturned = { name: error.name, message: error.message };
				expect(response).to.have.property("error").to.not.eql(false);
				expect(response).to.have.status(500);
				expect(response).to.have.property("body").to.be.deep.equal(errorReturned);
			});
		});
	});
	describe("GET /", () => {
		it("Returns 200 with all users as an array", async () => {
			const result: any = [User1, User2];
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
			const result: any = User1;
			const response = await chai
				.request(server)
				.get(baseUrl + "/" + User1_Id)
				.set({ Authorization: `Bearer ${token}` });
			expect(response).to.have.property("error").to.eql(false);
			expect(response).to.have.status(200);
			expect(response).to.have.property("body").to.eql(result);
		});
		it("Returns 500, with custom error, if path param is not UUID", async () => {
			const wrongUUID: string = "toto";
			const response = await chai
				.request(server)
				.get(baseUrl + "/" + wrongUUID)
				.set({ Authorization: `Bearer ${token}` });
			const error = new NotUUIDError(wrongUUID);
			const errorReturned = { name: error.name, message: error.message };
			expect(response).to.have.property("error").to.not.eql(false);
			expect(response).to.have.status(500);
			expect(response).to.have.property("body").to.be.deep.equal(errorReturned);
		});
	});
});
