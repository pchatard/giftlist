import { UserNameDTO } from "./UserNameDTO";

export interface PartialListDTO {
	title?: string;
	description?: string;
	sharingCode?: string;
	closureDate?: string;
	ownersDTO?: UserNameDTO[];
	isShared?: boolean;
	grantedUsersDTO?: UserNameDTO[];
}
