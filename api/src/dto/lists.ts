import List from "../models/List";
import Expand from "./expand";

/* prettier-ignore */
export type CreateListDTO = Omit<List, "id"	| "sharingCode"	| "gifts"	| "owners"	| "grantedUsers"	| "ownersDTO"	| "grantedUsersDTO"	| "createdDate"	| "updatedDate">;

export interface ListIdDTO extends Expand<Pick<List, "id">> {}

/* prettier-ignore */
export type ListDTO = Pick<List, "id" | "description"	| "title"	| "isShared"	| "sharingCode"	| "closureDate"	| "ownersDTO"	| "grantedUsersDTO">;

export type EditListDTO = CreateListDTO;
