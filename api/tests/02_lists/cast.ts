import { ListDTO } from "../../src/dto/lists";
import { cleanObject } from "../../src/helpers/cleanObjects";
import List from "../../src/models/List";
import { GlobalVar, ListTest } from "../global";

export function castAsListDTO(list: List, showGrantedIds: boolean = true): ListDTO {
	const { grantedUsers, owners, updatedDate, createdDate, sharingCode, ...rest } = list;
	return cleanObject({
		...rest,
		grantedUsersIds: showGrantedIds ? rest.grantedUsersIds : undefined,
		sharingCode: rest.isShared ? sharingCode : "",
	}) as ListDTO;
}

export function castArrayAsListDTO(lists: List[]): ListDTO[] {
	return lists.map((l) => castAsListDTO(l, false));
}

export function ListTestAsList(changes?: Partial<List>): List {
	return {
		...ListTest,
		...changes,
		id: GlobalVar.ListTest_Id,
		sharingCode: GlobalVar.ListTest_SharingCode,
	} as List;
}
