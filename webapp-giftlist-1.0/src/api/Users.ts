import { AxiosError, AxiosResponse } from "axios";

import router from "@/router";
import { APIStatusCodeEnum } from "@/types/enums/APIStatusCodeEnum";
import { PartialUserDTO } from "@/types/dto/PartialUserDTO";
import { UserDTO } from "@/types/dto/UserDTO";
import { Auth0Client } from "@auth0/auth0-spa-js";

import GiftlistAPI from "./GiftlistAPI";

const API_PATH_ME = "/users/me";
const API_PATH_GET_ALL = "/users";
const API_PATH_GET_BY_EMAIL = (email: string) => `/users/profiles/${email}`;

export default class Users {
	// Get my information
	static async me(auth: Auth0Client): Promise<UserDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<UserDTO> | undefined = await GiftlistAPI.get(
				auth,
				API_PATH_ME,
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

	// Edit my information
	// Possible errors (401, 422)
	static async edit(auth: Auth0Client, user: PartialUserDTO): Promise<boolean | undefined> {
		try {
			const apiResponse: AxiosResponse<void> | undefined = await GiftlistAPI.put(
				auth,
				API_PATH_ME,
				{
					...user,
				}
			);

			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la modification de l'utilisateur."
				);
			}
		}
	}

	// Delete my account
	static async delete(auth: Auth0Client): Promise<boolean | undefined> {
		try {
			const apiResponse = await GiftlistAPI.delete(auth, API_PATH_ME);
			if (apiResponse && apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la suppression de l'utilisateur."
				);
			}
		}
	}

	// Get all users
	static async getAll(auth: Auth0Client): Promise<UserDTO[] | undefined> {
		try {
			const apiResponse: AxiosResponse<UserDTO[]> | undefined = await GiftlistAPI.get(
				auth,
				API_PATH_GET_ALL,
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

	// Get one user by email
	static async getByEmail(auth: Auth0Client, email: string): Promise<UserDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<UserDTO> | undefined = await GiftlistAPI.get(
				auth,
				API_PATH_GET_BY_EMAIL(email)
			);
			if (apiResponse && apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			}
		} catch (error) {
			if ((error as AxiosError).response?.status !== APIStatusCodeEnum.UNAUTHORIZED) {
				GiftlistAPI.showErrorSnackbar(
					"Une erreur est survenue lors de la récupération de l'utilisateur."
				);
			}
		}
	}
}
