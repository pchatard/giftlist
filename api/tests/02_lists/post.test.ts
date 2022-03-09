import { expect } from "chai";

import { GlobalVar, ListTest, Url_ListPost } from "../global";
import { post } from "../helpers/crud";
import { expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";
import { User1 } from "../seeder/users.seed";

export default function suite() {
	it("Returns 200 with ID if all data are provided", async () => {
		const response = await post(Url_ListPost(), ListTest);
		expect200(response);
		expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
		GlobalVar.ListTest_Id = response.body.id;
	});
	it("Returns 422, with validation error, if one of fields is empty", async () => {
		const responses = [
			await post(Url_ListPost(), { title: "TestList2" }),
			await post(Url_ListPost(), { ownersIds: [User1.id] }),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
