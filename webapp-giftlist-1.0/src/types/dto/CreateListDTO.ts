export interface CreateListDTO {
	title: string;
	closureDate?: string;
	ownersIds: string[];
	isShared: boolean;
	grantedUsersIds?: string[];
}
