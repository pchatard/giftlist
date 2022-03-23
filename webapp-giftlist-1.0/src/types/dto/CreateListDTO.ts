import { UserNameDTO } from "./UserNameDTO";

export interface CreateListDTO {
	title: string;
	description?: string;
	closureDate?: string | null;
	ownersIds: string[];
	isShared: boolean;
	grantedUsersIds?: string[];
}
