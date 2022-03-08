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
export interface ListDTO
	extends Expand<
		Pick<List, "id" | "title" | "isShared" | "sharingCode" | "closureDate" | "ownersIds">
	> {}
