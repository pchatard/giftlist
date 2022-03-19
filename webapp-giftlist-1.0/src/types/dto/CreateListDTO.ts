import { UserNameDTO } from "./UserNameDTO";

export interface CreateListDTO {
	title: string;
	description?: string;
	closureDate?: string;
	ownersIds: string[];
	ownersDTO?: UserNameDTO[];
	isShared: boolean;
	grantedUsersIds?: string[];
	grantedUsersDTO?: UserNameDTO[];
}
