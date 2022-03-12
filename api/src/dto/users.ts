import User from "../models/User";
import Expand from "./expand";

export interface CreateUserDTO
	extends Expand<Omit<User, "friends" | "lists" | "friendLists" | "createdDate">> {}
export interface UserIdDTO extends Expand<Pick<User, "id">> {}
export interface UserDTO extends Expand<Pick<User, "displayName" | "email">> {}
