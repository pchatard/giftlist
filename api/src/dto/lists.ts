import List from "../models/List";
import Expand from "./expand";

export interface CreateListDTO
	extends Expand<
		Omit<
			List,
			"id" | "sharingCode" | "gifts" | "owners" | "grantedUsers" | "createdDate" | "updatedDate"
		>
	> {}
export interface ListIdDTO extends Expand<Pick<List, "id">> {}
export type ListDTO = Pick<
	List,
	| "id"
	| "description"
	| "title"
	| "isShared"
	| "sharingCode"
	| "closureDate"
	| "ownersDTO"
	| "grantedUsersDTO"
>;

export interface EditListDTO extends Expand<Omit<ListDTO, "id">> {}
