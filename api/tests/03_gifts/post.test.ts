import { expect } from "chai";

import { Gift1, Gift2, Gift3, GlobalVar, Url_GiftPost } from "../global";
import { post } from "../helpers/crud";
import { expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";

export default function suite() {
	it("Returns 200 with ID if all data are provided", async () => {
		const responses = [
			await post(Url_GiftPost(GlobalVar.List1_Id, GlobalVar.User1_Id), Gift1),
			await post(Url_GiftPost(GlobalVar.List1_Id, GlobalVar.User1_Id), Gift2),
			await post(Url_GiftPost(GlobalVar.List2_Id, GlobalVar.User1_Id), Gift3),
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
