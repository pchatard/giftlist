import { ListDTO } from "../../src/dto/lists";
import { castListAsListDTO } from "../../src/helpers/lists";
import List from "../../src/models/List";
import { GlobalVar, ListTest, ListTestWithGranted } from "../global";
import { User1, UserTest } from "../seeder/users.seed";

export function castAsListDTO(list: List): ListDTO {
	return castListAsListDTO(list);
}

export function castArrayAsListDTO(lists: List[]): ListDTO[] {
	return lists.map((l) => castAsListDTO(l));
}

export function ListTestAsList(changes?: Partial<List>): List {
	return {
		...ListTest,
		id: GlobalVar.ListTest_Id,
		sharingCode: GlobalVar.ListTest_SharingCode,
		owners: [UserTest],
		isOwner: true,
		...changes,
	} as List;
}

export function ListTestWithGrantedAsList(changes?: Partial<List>): List {
	return {
		...ListTestWithGranted,
		id: GlobalVar.ListTestWithGranted_Id,
		sharingCode: GlobalVar.ListTestWithGranted_SharingCode,
		owners: [UserTest],
		isOwner: true,
		grantedUsers: [User1],
		...changes,
	} as List;
}
