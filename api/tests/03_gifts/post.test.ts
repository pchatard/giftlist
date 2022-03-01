import { expect } from "chai";
import { v4 as uuidv4 } from "uuid";

import { Gift1, Gift2, Gift3, Gift4, GlobalVar, Url_GiftPost } from "../global";
import { post } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await post(Url_GiftPost(GlobalVar.List3_Id), Gift4);
		expectError(response, 401, "Unauthorized");
		GlobalVar.Gift4_Id = uuidv4(); // to pass parameter validation in future test
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await post(Url_GiftPost(GlobalVar.List2_Id), Gift3);
		expectError(response, 401, "Unauthorized");
		// TODO: find a way
		GlobalVar.Gift3_Id = uuidv4(); // to pass parameter validation in future test
	});
	it("Returns 200 with ID if all data are provided", async () => {
		const responses = [
			await post(Url_GiftPost(GlobalVar.List1_Id), Gift1),
			await post(Url_GiftPost(GlobalVar.List1_Id), Gift2),
		];
		responses.forEach((response, index) => {
			expect200(response);
			expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
			if (index == 0) GlobalVar.Gift1_Id = response.body.id;
			if (index == 1) GlobalVar.Gift2_Id = response.body.id;
			if (index == 2) GlobalVar.Gift3_Id = response.body.id;
		});
	});
	it("Returns 422, with validation error, if one of fields is empty", async () => {
		const responses = [
			await post(Url_GiftPost(), { title: "TestGift2" }),
			await post(Url_GiftPost(), { category: "testCategory" }),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
