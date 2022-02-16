import { expect } from "chai";

import { CreateListDTO, ListDTO } from "../../src/dto/lists";
import { GlobalVar, List1, List2, List3, Url_ListDelete, Url_ListGetAll } from "../global";
import { del, get } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await del(Url_ListDelete(GlobalVar.List1_Id, GlobalVar.User2_Id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, list forgotten but not deleted, if not owned but granted", async () => {
		const response = await del(Url_ListDelete(GlobalVar.List2_Id, GlobalVar.User2_Id));
		expect204(response);
		const lists_User2 = await get(Url_ListGetAll(GlobalVar.User2_Id, "all"));
		checkCreateListsDTOInListsDTO(lists_User2.body, [List3]);
		const lists_User1 = await get(Url_ListGetAll(GlobalVar.User1_Id, "all"));
		checkCreateListsDTOInListsDTO(lists_User1.body, [{ ...List1, isShared: true }, List2, List3]);
	});
	it("Returns 204 and list is no more present", async () => {
		const response = await del(Url_ListDelete(GlobalVar.List1_Id, GlobalVar.User1_Id));
		expect204(response);
		const lists_User1 = await get(Url_ListGetAll(GlobalVar.User1_Id, "all"));
		checkCreateListsDTOInListsDTO(lists_User1.body, [List2, List3]);
		await del(Url_ListDelete(GlobalVar.List2_Id, GlobalVar.User1_Id));
	});
	it("Returns 204, list deleted for user, even if multiple owned", async () => {
		const response = await del(Url_ListDelete(GlobalVar.List3_Id, GlobalVar.User1_Id));
		expect204(response);
		const lists_User1 = await get(Url_ListGetAll(GlobalVar.User1_Id, "all"));
		checkCreateListsDTOInListsDTO(lists_User1.body, []);
		const lists_User2 = await get(Url_ListGetAll(GlobalVar.User2_Id, "all"));
		checkCreateListsDTOInListsDTO(lists_User2.body, [
			{ ...List3, ownersIds: [GlobalVar.User2_Id] },
		]);
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await del(Url_ListDelete(wrongUUID, GlobalVar.User1_Id)),
			await del(Url_ListDelete(GlobalVar.List1_Id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}

function checkCreateListsDTOInListsDTO(checkedList: ListDTO[], listToMatch: CreateListDTO[]) {
	for (const [index, list] of checkedList.entries()) {
		const { sharingCode, ownersIds: listOwners, ...listCore } = list;
		const { ownersIds: toMatchOwners, grantedUsersIds, ...toMatchCore } = listToMatch[index];
		expect(listOwners).to.have.members(toMatchOwners);
		expect(listCore).to.includes(toMatchCore);
	}
}
