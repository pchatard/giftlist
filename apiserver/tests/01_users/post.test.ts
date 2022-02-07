import { expect } from "chai";
import { BaseUrl_Users, GlobalVar, User1, User2 } from "../global";
import MailAlreadyUsedError from "./../../src/errors/UserErrors/MailAlreadyUsedError";
import { expect200 } from "./../helpers/success";
import { expect500, expectValidationFailed } from "./../helpers/error";
import { post } from "./../helpers/crud";

export default function suite() {
	it("Returns 200 with ID if all data are provided", async () => {
		const responses = [
			await post(BaseUrl_Users + "/", User1),
			await post(BaseUrl_Users + "/", User2),
		];
		responses.forEach((response, index) => {
			expect200(response);
			expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
			// TODO: Bette handle
			if (index == 0) GlobalVar.User1_Id = response.body.id;
			if (index == 1) GlobalVar.User2_Id = response.body.id;
		});
	});
	it("Returns 500, with custom error, if email is already used", async () => {
		const response = await post(BaseUrl_Users + "/", User1);
		expect500(response, new MailAlreadyUsedError());
	});
	it("Returns 422, with validation error, if email is malformed", async () => {
		const responses = [
			await post(BaseUrl_Users + "/", { email: "test", displayName: "TestUser2" }),
			await post(BaseUrl_Users + "/", { email: "test@test", displayName: "TestUser2" }),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
	it("Returns 422, with validation error, if one of fields is empty", async () => {
		const responses = [
			await post(BaseUrl_Users + "/", { displayName: "TestUser2" }),
			await post(BaseUrl_Users + "/", { email: "test@test" }),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
