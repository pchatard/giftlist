import { APIStatusCodeEnum } from "@/types/APIStatusCodeEnum";
import { UserDTO } from "@/types/dto/UserDTO";
import { AxiosError, AxiosResponse } from "axios";
import GiftlistAPI from "./GiftlistAPI";

const API_PATH_ME = "/users/me";
const API_PATH_GET_ALL = "/users";
const API_PATH_GET_BY_EMAIL = (email: string) => `/users/${email}`;

export default class Users {
	// Get my information
	static async me(): Promise<UserDTO | Error> {
		try {
			const apiResponse: AxiosResponse<UserDTO> = await GiftlistAPI.get(API_PATH_ME);
			if (apiResponse.status == APIStatusCodeEnum.OK) {
				const user = apiResponse.data;
				return user;
			} else {
				throw new Error(apiResponse.statusText);
			}
		} catch (error) {
			return error as Error;
		}
	}

	// Edit my information
	static async edit(user: UserDTO): Promise<void> {
		try {
			const response = await GiftlistAPI.put(API_PATH_ME, { ...user });
			// Check statusCode ?
		} catch (error) {
			console.log(error);
		}
	}

	// Delete my account
	static async delete(): Promise<void | Error> {
		try {
			await GiftlistAPI.delete(API_PATH_ME);
		} catch (error) {
			return error as Error;
		}
	}

	// Get all users
	static async getAll(): Promise<UserDTO[] | undefined> {
		try {
			const apiResponse: AxiosResponse<UserDTO[]> = await GiftlistAPI.get(API_PATH_GET_ALL);
			const users = apiResponse.data;
			return users;
		} catch (error: any) {
			GiftlistAPI.showErrorSnackbar(error);
		}
	}

	// Get one user by email
	static async getByEmail(email: string): Promise<UserDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<UserDTO> = await GiftlistAPI.get(
				API_PATH_GET_BY_EMAIL(email)
			);
			const user = apiResponse.data;
			return user;
		} catch (error) {
			console.log(error);
		}
	}
}
