import { UserNameDTO } from "./UserNameDTO";

export interface ListDTO {
	id: string;
	title: string;
	sharingCode: string;
	isShared: boolean;
	description?: string;
	closureDate?: string;
	ownersDTO?: UserNameDTO[];
	grantedUsersDTO?: UserNameDTO[];
}
