import { CreateListDTO } from "@/types/dto/CreateListDTO";
import { ListDTO } from "@/types/dto/ListDTO";
import { ListIdDTO } from "@/types/dto/ListIdDTO";

export default class Lists {
	API_PATH_CREATE = "";
	API_PATH_GET = (select: "all" | "owned" | "granted") => `${select}`;
	API_PATH_GET_ONE = (listId: string) => `${listId}`;
	API_PATH_EDIT = (listId: string) => `${listId}`;
	API_PATH_DELETE = (listId: string) => `${listId}`;
	API_PATH_SHARE = (listId: string) => `${listId}`;
	API_PATH_UNSHARE = (listId: string) => `${listId}`;
	API_PATH_GET_FROM_SHARING_CODE = (sharingCode: string) => `${sharingCode}`;

	// Create a new list
	static create(list: CreateListDTO): ListIdDTO {
		console.log(list);
		return {};
	}

	// Get all, owned or granted lists
	static get(select: "all" | "owned" | "granted"): ListDTO[] {
		console.log(select);
		return [];
	}

	// Get a list
	static getOne(listId: string): ListDTO {
		console.log(listId);
		return {};
	}

	// Edit a list
	static edit(listId: string, list: ListDTO): ListDTO {
		console.log(listId, list);
		return {};
	}

	// Delete a list
	static delete(listId: string) {
		console.log(listId);
	}

	// Make a list public
	static share(listId: string) {
		console.log(listId);
	}

	// Make a list private
	static unshare(listId: string) {
		console.log(listId);
	}

	// Get a shared list from its sharing code
	static getAccessFromSharingCode(sharingCode: string) {
		console.log(sharingCode);
	}
}
