import { ListDTO } from "../../src/dto/lists";
import { castListAsListDTO } from "../../src/helpers/lists";
import List from "../../src/models/List";
import { GlobalVar, ListTest, ListTestWithGranted, UserTest } from "../global";
import { User1 } from "../seeder/users.seed";

export function castAsListDTO(list: List, showGrantedIds: boolean = true): ListDTO {
	return castListAsListDTO(list, showGrantedIds);
}

export function castArrayAsListDTO(lists: List[]): ListDTO[] {
	return lists.map((l) => castAsListDTO(l, false));
}

export function ListTestAsList(changes?: Partial<List>): List {
	return {
		...ListTest,
		id: GlobalVar.ListTest_Id,
		sharingCode: GlobalVar.ListTest_SharingCode,
		owners: [{ ...UserTest, createdDate: new Date() }],
		...changes,
	} as List;
}

export function ListTestWithGrantedAsList(changes?: Partial<List>): List {
	return {
		...ListTestWithGranted,
		id: GlobalVar.ListTestWithGranted_Id,
		sharingCode: GlobalVar.ListTestWithGranted_SharingCode,
		owners: [{ ...UserTest, createdDate: new Date() }],
		grantedUsers: [User1],
		...changes,
	} as List;
}
