import { expect } from "chai";

import MailAlreadyUsedError from "../../src/errors/UserErrors/MailAlreadyUsedError";
import { GlobalVar, Url_UserPost, User1, User2 } from "../global";
import { post } from "../helpers/crud";
import { expect500, expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";

export default function suite() {
	it("Returns 200 with ID if all data are provided", async () => {
		const responses = [await post(Url_UserPost(), User1), await post(Url_UserPost(), User2)];
		responses.forEach((response, index) => {
			expect200(response);
			expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
			// TODO: Bette handle
			if (index == 0) GlobalVar.User1_Id = response.body.id;
			if (index == 1) GlobalVar.User2_Id = response.body.id;
		});
	});
	it("Returns 500, with custom error, if email is already used", async () => {
		const response = await post(Url_UserPost(), User1);
		expect500(response, new MailAlreadyUsedError());
	});
	it("Returns 422, with validation error, if email is malformed", async () => {
		const responses = [
			await post(Url_UserPost(), { email: "test", displayName: "TestUser2" }),
			await post(Url_UserPost(), { email: "test@test", displayName: "TestUser2" }),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
	it("Returns 422, with validation error, if one of fields is empty", async () => {
		const responses = [
			await post(Url_UserPost(), { displayName: "TestUser2" }),
			await post(Url_UserPost(), { email: "test@test" }),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
