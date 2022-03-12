import { AxiosError, AxiosResponse } from "axios";

import router from "@/router";
import { APIStatusCodeEnum } from "@/types/APIStatusCodeEnum";
import { CreateListDTO } from "@/types/dto/CreateListDTO";
import { ListDTO } from "@/types/dto/ListDTO";
import { ListIdDTO } from "@/types/dto/ListIdDTO";
import { PartialListDTO } from "@/types/dto/PartialListDTO";
import { Auth0Client } from "@auth0/auth0-spa-js";

import GiftlistAPI from "./GiftlistAPI";

const API_PATH_LISTS = "/lists";
const API_PATH_LIST = (listId: string) => `/lists/${listId}`;
const API_PATH_SHARE = (listId: string) => `/lists/${listId}/share`;
const API_PATH_UNSHARE = (listId: string) => `/lists/${listId}/unshare`;
const API_PATH_GET_FROM_SHARING_CODE = (sharingCode: string) => `/lists/invite/${sharingCode}`;

export default class Lists {
	// Create a new list
	// Errors : 401, 422
	// TODO: In CreateListDTO, accept a list of email addresses because I can't access IDs
	// TODO: Test grantedUsers and closureDate creation
	static async create(auth: Auth0Client, list: CreateListDTO): Promise<ListIdDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<ListIdDTO> = await GiftlistAPI.post(
				auth,
				API_PATH_LISTS,
				{ ...list }
			);

			if (apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Get all, owned or granted lists
	// Errors: 401, 422
	static async get(
		auth: Auth0Client,
		select: "all" | "owned" | "granted"
	): Promise<ListDTO[] | undefined> {
		const params = { select };
		try {
			const apiResponse: AxiosResponse<ListDTO[]> = await GiftlistAPI.get(
				auth,
				API_PATH_LISTS,
				params
			);

			if (apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Get a list
	// Errors: 401, 422
	static async getOne(auth: Auth0Client, listId: string): Promise<ListDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<ListDTO> = await GiftlistAPI.get(
				auth,
				API_PATH_LIST(listId)
			);

			if (apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Edit a list
	// Errors: 401, 422
	static async edit(
		auth: Auth0Client,
		listId: string,
		list: PartialListDTO
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_LIST(listId), { ...list });

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Delete a list
	// Errors: 401, 422
	static async delete(auth: Auth0Client, listId: string): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.delete(auth, API_PATH_LIST(listId));

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Make a list public
	// Errors: 401, 422
	static async share(auth: Auth0Client, listId: string): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_SHARE(listId));

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Make a list private
	// Errors: 401, 422
	// Works fine but as discussed, we need to change the way it works
	static async unshare(auth: Auth0Client, listId: string): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_UNSHARE(listId));

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Put my id in a shared list grantedUsers property
	// Errors: 401, 422
	// Add myself : OK
	// TODO: Test with another user
	static async getAccessFromSharingCode(
		auth: Auth0Client,
		sharingCode: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(
				auth,
				API_PATH_GET_FROM_SHARING_CODE(sharingCode)
			);

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: Use this error in an error state module ?
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}
}
