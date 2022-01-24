import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { BaseUrl_Users, GlobalVar, User1, User2 } from "../global";
import MailAlreadyUsedError from "../../src/errors/UserErrors/MailAlreadyUsedError";
import MailIsInvalidError from "../../src/errors/UserErrors/MailIsInvalidError";
import FieldIsMissingError from "../../src/errors/FieldIsMissingError";
import { expect200 } from "../helpers/success";
import { expect500 } from "../helpers/errors";

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
			expect200(response);
			expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
			if (index == 0) GlobalVar.User1_Id = response.body.id;
			if (index == 1) GlobalVar.User2_Id = response.body.id;
		});
	});
	it("Returns 500, with custom error, if email is already used", async () => {
		const response = await chai
			.request(server)
			.post(BaseUrl_Users + "/")
			.send(User1)
			.set({ Authorization: `Bearer ${GlobalVar.Token}` });
		expect500(response, new MailAlreadyUsedError());
	});
	it("Returns 500, with custom error, if email is malformed", async () => {
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
		responses.forEach((response) => expect500(response, new MailIsInvalidError()));
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
		responses.forEach(({ error, response }) => expect500(response, error));
	});
}
