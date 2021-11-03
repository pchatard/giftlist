export interface List {
	id: string;
	name: string;
}

export class PersonalList implements List {
	id!: string;
	name!: string;
}

export class SharedList implements List {
	id!: string;
	name!: string;
	sharedCode!: string;
}
