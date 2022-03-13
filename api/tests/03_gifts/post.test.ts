import { expect } from "chai";

import { GiftTest, GlobalVar, Url_GiftPost } from "../global";
import { post } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";
import { Gift3, Gift4 } from "../seeder/gifts.seed";
import { ListGranted, ListUnauthorized } from "../seeder/lists.seed";
import { castAsCreateGiftDTO } from "./cast";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await post(Url_GiftPost(ListUnauthorized.id), castAsCreateGiftDTO(Gift4));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 401 Unauthorized, if not owned but granted", async () => {
		const response = await post(Url_GiftPost(ListGranted.id), castAsCreateGiftDTO(Gift3));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 200 with ID if all data are provided", async () => {
		const response = await post(Url_GiftPost(GlobalVar.ListTest_Id), GiftTest);
		expect200(response);
		expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
		GlobalVar.GiftTest_Id = response.body.id;
	});
	it("Returns 422, with validation error, if one of fields is empty", async () => {
		const responses = [
			await post(Url_GiftPost(), { title: "TestGift2" }),
			await post(Url_GiftPost(), { category: "testCategory" }),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
