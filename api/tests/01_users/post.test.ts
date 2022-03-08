import { expect } from "chai";

import { Url_UserPost, UserTest } from "../global";
import { post } from "../helpers/crud";
import { expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";
import { User1 } from "../seeder/users.seed";

export default function suite() {
	it("Returns 200 with ID if all data are provided", async () => {
		const response = await post(Url_UserPost(), UserTest);
		expect200(response);
		expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
	});
	it("Returns 422, with validation error, if email is malformed", async () => {
		const responses = [
			await post(Url_UserPost(), { ...User1, email: "test" }),
			await post(Url_UserPost(), { ...User1, email: "test@test" }),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
	it("Returns 422, with validation error, if one of fields is empty", async () => {
		const responses = [
			await post(Url_UserPost(), { displayName: "TestUser2", email: "test@test" }),
			await post(Url_UserPost(), { id: "auth0|000000000000", email: "test@test" }),
			await post(Url_UserPost(), { id: "auth0|000000000000", displayName: "TestUser2" }),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
