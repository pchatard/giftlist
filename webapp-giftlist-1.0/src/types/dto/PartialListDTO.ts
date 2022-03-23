import { UserNameDTO } from "./UserNameDTO";

export interface PartialListDTO {
	title?: string;
	description?: string;
	sharingCode?: string;
	closureDate?: string | null;
	ownersIds?: string[];
	isShared?: boolean;
	grantedUsersIds?: string[];
}
