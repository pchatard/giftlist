import { CreateUserDTO, UserNameDTO } from "../dto/users";
import { User } from "../models/User";
import { cleanObject } from "./cleanObjects";

export function castUserAsUserNameDTO(user: User): UserNameDTO {
	return cleanObject({ id: user.id, displayName: user.displayName }) as UserNameDTO;
}

export function castUserAsCreateUserDTO(user: User): CreateUserDTO {
	return cleanObject({
		auth0Id: user.auth0Id,
		displayName: user.displayName,
		email: user.email,
	}) as CreateUserDTO;
}
