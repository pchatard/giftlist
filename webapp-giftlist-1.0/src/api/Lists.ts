import { CreateListDTO } from "@/types/dto/CreateListDTO";
import { ListDTO } from "@/types/dto/ListDTO";
import { ListIdDTO } from "@/types/dto/ListIdDTO";
import { AxiosResponse } from "axios";
import GiftlistAPI from "./GiftlistAPI";

const API_PATH_LISTS = "/lists";
const API_PATH_LIST = (listId: string) => `/lists/${listId}`;
const API_PATH_SHARE = (listId: string) => `/lists/${listId}/share`;
const API_PATH_UNSHARE = (listId: string) => `/lists/${listId}/unshare`;
const API_PATH_GET_FROM_SHARING_CODE = (sharingCode: string) => `/lists/invite/${sharingCode}`;

export default class Lists {
	// Create a new list
	static async create(list: CreateListDTO): Promise<ListIdDTO | undefined> {
		try {
			const apiResponse = await GiftlistAPI.post(API_PATH_LISTS, { ...list });
			const listId = apiResponse.data;
			return listId;
		} catch (error) {
			console.log(error);
		}
	}

	// Get all, owned or granted lists
	static async get(select: "all" | "owned" | "granted"): Promise<ListDTO[] | undefined> {
		const params = { select };
		try {
			const apiResponse: AxiosResponse<ListDTO[]> = await GiftlistAPI.get(
				API_PATH_LISTS,
				params
			);
			const lists = apiResponse.data;
			return lists;
		} catch (error) {
			console.log(error);
		}
	}

	// Get a list
	static async getOne(listId: string): Promise<ListDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<ListDTO> = await GiftlistAPI.get(API_PATH_LIST(listId));
			const list = apiResponse.data;
			return list;
		} catch (error) {
			console.log(error);
		}
	}

	// Edit a list
	static async edit(listId: string, list: ListDTO): Promise<void> {
		try {
			const apiResponse = await GiftlistAPI.put(API_PATH_LIST(listId), { ...list });
			// Check statusCode
		} catch (error) {
			console.log(error);
		}
	}

	// Delete a list
	static async delete(listId: string): Promise<void> {
		try {
			await GiftlistAPI.delete(API_PATH_LIST(listId));
		} catch (error) {
			console.log(error);
		}
	}

	// Make a list public
	static async share(listId: string): Promise<void> {
		try {
			const apiResponse = await GiftlistAPI.put(API_PATH_SHARE(listId));
			// Check statusCode
		} catch (error) {
			console.log(error);
		}
	}

	// Make a list private
	static async unshare(listId: string): Promise<void> {
		try {
			const apiResponse = await GiftlistAPI.put(API_PATH_UNSHARE(listId));
			// Check statusCode
		} catch (error) {
			console.log(error);
		}
	}

	// Get a shared list from its sharing code
	static async getAccessFromSharingCode(sharingCode: string): Promise<void> {
		try {
			const apiResponse = await GiftlistAPI.put(API_PATH_GET_FROM_SHARING_CODE(sharingCode));
			// Check statusCode
		} catch (error) {
			console.log(error);
		}
	}
}
