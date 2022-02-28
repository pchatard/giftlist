import { expect } from "chai";

import { CreateListDTO, ListDTO } from "../../src/dto/lists";
import { GlobalVar, List1, Url_ListDelete, Url_ListGetAll } from "../global";
import { del, get } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await del(Url_ListDelete(GlobalVar.List3_Id));
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, list forgotten but not deleted, if not owned but granted", async () => {
		const response = await del(Url_ListDelete(GlobalVar.List2_Id));
		expect204(response);
		const lists_user = await get(Url_ListGetAll("all"));
		checkCreateListsDTOInListsDTO(lists_user.body, [List1]);
	});
	it("Returns 204 and list is no more present", async () => {
		const response = await del(Url_ListDelete(GlobalVar.List1_Id));
		expect204(response);
		const lists_user = await get(Url_ListGetAll("all"));
		checkCreateListsDTOInListsDTO(lists_user.body, []);
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const response = await del(Url_ListDelete(wrongUUID));
		expectValidationFailed(response);
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
