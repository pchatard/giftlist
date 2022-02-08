// import { expect } from "chai";
import { BaseUrl_Lists, GlobalVar } from "./../global";
import { expectError, expectValidationFailed } from "./../helpers/error";
import { expect204 } from "./../helpers/success";
import { del, get } from "./../helpers/crud";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await del(
			BaseUrl_Lists + "/" + GlobalVar.List1_Id + "?userId=" + GlobalVar.User2_Id
		);
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, list forgotten but not deleted, if not owned but granted", async () => {
		const response = await del(
			BaseUrl_Lists + "/" + GlobalVar.List2_Id + "?userId=" + GlobalVar.User2_Id
		);
		expect204(response);
		await get(BaseUrl_Lists + "?userId=" + GlobalVar.User2_Id + "&select=all");
		// Check return
		await get(BaseUrl_Lists + "?userId=" + GlobalVar.User1_Id + "&select=all");
		// Check return
	});
	it("Returns 204 and list is no more present", async () => {
		const response = await del(
			BaseUrl_Lists + "/" + GlobalVar.List1_Id + "?userId=" + GlobalVar.User1_Id
		);
		expect204(response);
		await get(BaseUrl_Lists + "?userId=" + GlobalVar.User1_Id + "&select=all");
		// Check return
		await del(BaseUrl_Lists + "/" + GlobalVar.List2_Id + "?userId=" + GlobalVar.User1_Id);
	});
	it("Returns 204, list deleted for user, even if multiple owned", async () => {
		const response = await del(
			BaseUrl_Lists + "/" + GlobalVar.List3_Id + "?userId=" + GlobalVar.User1_Id
		);
		expect204(response);
		await get(BaseUrl_Lists + "?userId=" + GlobalVar.User1_Id + "&select=all");
		// Check return
		await get(BaseUrl_Lists + "?userId=" + GlobalVar.User2_Id + "&select=all");
		// Check return
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await del(BaseUrl_Lists + "/" + wrongUUID);
		expectValidationFailed(response);
	});
}
