import { expect } from "chai";
import { GlobalVar, List1, List2, List3, Url_ListPost } from "./../global";
import { expect200 } from "./../helpers/success";
import { expectValidationFailed } from "./../helpers/error";
import { post } from "./../helpers/crud";

export default function suite() {
	it("Returns 200 with ID if all data are provided", async () => {
		const responses = [
			await post(Url_ListPost(), List1),
			await post(Url_ListPost(), List2),
			await post(Url_ListPost(), List3),
		];
		responses.forEach((response, index) => {
			expect200(response);
			expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
			if (index == 0) GlobalVar.List1_Id = response.body.id;
			if (index == 1) GlobalVar.List2_Id = response.body.id;
			if (index == 2) GlobalVar.List3_Id = response.body.id;
		});
	});
	it("Returns 422, with validation error, if one of fields is empty", async () => {
		const responses = [
			await post(Url_ListPost(), { title: "TestList2" }),
			await post(Url_ListPost(), { ownersIds: [GlobalVar.User1_Id] }),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
