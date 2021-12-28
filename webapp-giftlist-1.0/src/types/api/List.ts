import { Gift } from "./Gift";
import { User } from "./User";

export interface List {
	id: string;
	title: string;
	termDate?: Date;
	owners: User[];
	gifts: Gift[];
	isShared: boolean;
	sharingCode: string;
	authorizedUsers?: User[];
}
