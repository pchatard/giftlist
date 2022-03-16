import { ListDTO } from "../dto/lists";
import { UserNameDTO } from "../dto/users";
import { List } from "../models/List";
import { cleanObject } from "./cleanObjects";

export function castListAsListDTO(list: List, showGrantedIds: boolean = true): ListDTO {
	const { grantedUsers, grantedUsersIds, owners, ownersIds, createdDate, updatedDate, ...rest } =
		list;
	rest.sharingCode = rest.isShared ? rest.sharingCode : "";
	rest.ownersDTO = (owners || []).map((u) => {
		return { id: u.id, displayName: u.displayName } as UserNameDTO;
	});
	const gDTO = (grantedUsers || []).map((u) => {
		return { id: u.id, displayName: u.displayName } as UserNameDTO;
	});
	rest.grantedUsersDTO = showGrantedIds ? undefined : gDTO;
	return cleanObject(rest) as ListDTO;
}
