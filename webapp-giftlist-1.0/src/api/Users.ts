import { UserDTO } from "@/types/dto/UserDTO";

export default class Users {
	API_PATH_ME = "";
	API_PATH_EDIT = "";
	API_PATH_DELETE = "";
	API_PATH_GET_ALL = "";
	API_PATH_GET_BY_EMAIL = (email: string) => `${email}`;

	// Get my information
	static me(): UserDTO {
		return {};
	}

	// Edit my information
	static edit(user: UserDTO) {
		console.log(user);
	}

	// Delete my account
	static delete() {}

	// Get all users
	static getAll(): UserDTO[] {
		return [];
	}

	// Get one user by email
	static getByEmail(email: string): UserDTO {
		console.log(email);
		return {};
	}
}
