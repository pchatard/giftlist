export interface ListDTO {
	id: string;
	title: string;
	sharingCode: string;
	closureDate?: string;
	ownerIds: string[];
	isShared: boolean;
}
