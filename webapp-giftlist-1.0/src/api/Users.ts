import { UserDTO } from "@/types/dto/UserDTO";
import { AxiosResponse } from "axios";
import GiftlistAPI from "./APIUtils";

const API_PATH_ME = "/users/me";
const API_PATH_GET_ALL = "/users";
const API_PATH_GET_BY_EMAIL = (email: string) => `/users/${email}`;

export default class Users {
	// Get my information
	static async me(): Promise<UserDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<UserDTO> = await GiftlistAPI.get(API_PATH_ME);
			const user = apiResponse.data;
			return user;
		} catch (error) {
			console.log(error);
		}
	}

	// Edit my information
	static edit(user: UserDTO) {
		console.log(user);
	}

	// Delete my account
	static delete() {
		console.log();
	}

	// Get all users
	static async getAll(): Promise<UserDTO[] | undefined> {
		try {
			const apiResponse: AxiosResponse<UserDTO[]> = await GiftlistAPI.get(API_PATH_GET_ALL);
			const users = apiResponse.data;
			console.log(users);
			return users;
		} catch (error) {
			console.log(error);
		}
	}

	// Get one user by email
	static async getByEmail(email: string): Promise<UserDTO | undefined> {
		try {
			const apiResponse: AxiosResponse<UserDTO> = await GiftlistAPI.get(
				API_PATH_GET_BY_EMAIL(email)
			);
			const user = apiResponse.data;
			console.log(user);
			return user;
		} catch (error) {
			console.log(error);
		}
	}
}
