import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { BaseUrl_Users, GlobalVar, User1, User2 } from "../global";
import MailAlreadyUsedError from "../../src/errors/UserErrors/MailAlreadyUsedError";
import MailIsInvalidError from "../../src/errors/UserErrors/MailIsInvalidError";
import FieldIsMissingError from "../../src/errors/FieldIsMissingError";

chai.use(chaiHttp);

export default function suite() {
	it("Returns 200 with ID if all data are provided", async () => {
		const responses = [
			await chai
				.request(server)
				.post(BaseUrl_Users + "/")
				.send(User1)
				.set({ Authorization: `Bearer ${GlobalVar.Token}` }),
			await chai
				.request(server)
				.post(BaseUrl_Users + "/")
				.send(User2)
				.set({ Authorization: `Bearer ${GlobalVar.Token}` }),
		];
		responses.forEach((response, index) => {
			expect(response).to.have.property("error").to.eql(false);
			expect(response).to.have.status(200);
			expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
			if (index == 0) GlobalVar.User1_Id = response.body.id;
			if (index == 1) GlobalVar.User2_Id = response.body.id;
		});
	});
	it("Returns 500, with custom error, if email is already used", async () => {
		const error = new MailAlreadyUsedError();
		const errorReturned = { name: error.name, message: error.message };
		const response = await chai
			.request(server)
			.post(BaseUrl_Users + "/")
			.send(User1)
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
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
				.post(BaseUrl_Users + "/")
				.send({ email: "test", displayName: "TestUser2" })
				.set({ Authorization: `Bearer ${GlobalVar.Token}` }),
			await chai
				.request(server)
				.post(BaseUrl_Users + "/")
				.send({ email: "test@test", displayName: "TestUser2" })
				.set({ Authorization: `Bearer ${GlobalVar.Token}` }),
			await chai
				.request(server)
				.post(BaseUrl_Users + "/")
				.send({ email: "test@15483.cdc.d", displayName: "TestUser2" })
				.set({ Authorization: `Bearer ${GlobalVar.Token}` }),
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
					.post(BaseUrl_Users + "/")
					.send({ displayName: "TestUser2" })
					.set({ Authorization: `Bearer ${GlobalVar.Token}` }),
			},
			{
				error: new FieldIsMissingError("displayName"),
				response: await chai
					.request(server)
					.post(BaseUrl_Users + "/")
					.send({ email: "test@test" })
					.set({ Authorization: `Bearer ${GlobalVar.Token}` }),
			},
		];
		responses.forEach(({ error, response }) => {
			const errorReturned = { name: error.name, message: error.message };
			expect(response).to.have.property("error").to.not.eql(false);
			expect(response).to.have.status(500);
			expect(response).to.have.property("body").to.be.deep.equal(errorReturned);
		});
	});
}
