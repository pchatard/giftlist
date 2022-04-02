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
	// Possible Errors: 401, 422
	static async create(auth: Auth0Client, list: CreateListDTO): Promise<ListIdDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<ListIdDTO> | undefined = await GiftlistAPI.post(
				auth,
				API_PATH_LISTS,
				{ ...list }
			);

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la création de la liste"
				);
			}
		}
	}

	// Get all, owned or granted lists
	// Possible Errors: 401, 422
	static async get(
		auth: Auth0Client,
		select: "all" | "owned" | "granted"
	): Promise<ListDTO[] | undefined> {
		const params = { select };
		try {
			const apiResponse: AxiosResponse<ListDTO[]> | undefined = await GiftlistAPI.get(
				auth,
				API_PATH_LISTS,
				params,
				true
			);

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				router.push("/app/error");
			}
		}
	}

	// Get a list
	// Possible Errors: 401, 422
	static async getOne(auth: Auth0Client, listId: string): Promise<ListDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<ListDTO> | undefined = await GiftlistAPI.get(
				auth,
				API_PATH_LIST(listId),
				{},
				true
			);

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				router.push("/app/error");
			}
		}
	}

	// Edit a list
	// Possible Errors: 401, 422
	static async edit(
		auth: Auth0Client,
		listId: string,
		list: PartialListDTO
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_LIST(listId), { ...list });

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la modification de la liste"
				);
			}
		}
	}

	// Delete a list
	// Possible Errors: 401, 422
	static async delete(auth: Auth0Client, listId: string): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.delete(auth, API_PATH_LIST(listId));

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la suppression de la liste"
				);
			}
		}
	}

	// Make a list public
	// Possible Errors: 401, 422
	static async share(auth: Auth0Client, listId: string): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_SHARE(listId));

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la publication de la liste"
				);
			}
		}
	}

	// Make a list private
	// Possible Errors: 401, 422
	static async unshare(auth: Auth0Client, listId: string): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(auth, API_PATH_UNSHARE(listId));

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la privatisation de la liste"
				);
			}
		}
	}

	// Put my id in a shared list grantedUsers property
	// Possible Errors: 401, 422
	static async getAccessFromSharingCode(
		auth: Auth0Client,
		sharingCode: string
	): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.put(
				auth,
				API_PATH_GET_FROM_SHARING_CODE(sharingCode)
			);

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la récupération de la liste"
				);
			}
		}
	}
}
