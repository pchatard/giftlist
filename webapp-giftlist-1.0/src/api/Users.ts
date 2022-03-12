import { AxiosError, AxiosResponse } from "axios";

import router from "@/router";
import { APIStatusCodeEnum } from "@/types/APIStatusCodeEnum";
import { PartialUserDTO } from "@/types/dto/PartialUserDTO";
import { UserDTO } from "@/types/dto/UserDTO";
import { Auth0Client } from "@auth0/auth0-spa-js";

import GiftlistAPI from "./GiftlistAPI";

const API_PATH_ME = "/users/me";
const API_PATH_GET_ALL = "/users";
const API_PATH_GET_BY_EMAIL = (email: string) => `/users/${email}`;

export default class Users {
	// Get my information
	// Currently used in: Profile page
	// In case of errors : redirect to error page
	static async me(auth: Auth0Client): Promise<UserDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<UserDTO> = await GiftlistAPI.get(auth, API_PATH_ME);

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

	// Edit my information
	// TODO: Currently used in:
	// TODO: errors (401, 422)
	static async edit(auth: Auth0Client, user: PartialUserDTO): Promise<boolean | undefined> {
		try {
			const apiResponse: AxiosResponse<void> = await GiftlistAPI.put(auth, API_PATH_ME, {
				...user,
			});

			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			// TODO: errors (401, 422)
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Delete my account
	// Currently used in: Profile
	// In case of error, display a snackbar (401)
	static async delete(auth: Auth0Client): Promise<boolean> {
		try {
			const apiResponse = await GiftlistAPI.delete(auth, API_PATH_ME);
			if (apiResponse.status == APIStatusCodeEnum.NO_CONTENT) {
				return true;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			const axiosError = error as AxiosError;
			GiftlistAPI.showErrorSnackbar(axiosError);
			return false;
		}
	}

	// Get all users
	// TODO: Currently used in:
	// TODO: In case of errors : 401
	static async getAll(auth: Auth0Client): Promise<UserDTO[] | undefined> {
		try {
			const apiResponse: AxiosResponse<UserDTO[]> = await GiftlistAPI.get(
				auth,
				API_PATH_GET_ALL
			);

			if (apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}

	// Get one user by email
	// TODO: Used in ....
	// TODO: Errors 401, 422
	static async getByEmail(auth: Auth0Client, email: string): Promise<UserDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<UserDTO> = await GiftlistAPI.get(
				auth,
				API_PATH_GET_BY_EMAIL(email)
			);
			if (apiResponse.status == APIStatusCodeEnum.OK) {
				return apiResponse.data;
			} else if (apiResponse.status == APIStatusCodeEnum.VALIDATION_ERROR) {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			const axiosError = error as AxiosError;
			router.push("/app/error");
		}
	}
}
