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

// TODO: Understand why Expand make tsoa going to timeout
export type ListDTO = Pick<
	List,
	"id" | "title" | "isShared" | "sharingCode" | "closureDate" | "ownersIds" | "grantedUsersIds"
>;

export interface EditListDTO extends Expand<Omit<ListDTO, "id">> {}
