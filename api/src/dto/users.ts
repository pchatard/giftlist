import User from "../models/User";
import Expand from "./expand";

/* prettier-ignore */
export interface CreateUserDTO extends Expand<Omit<User, "id" | "friends" | "lists" | "friendLists" | "bookings" | "bookingsDTO" | "createdDate">> {}
export interface UserIdDTO extends Expand<Pick<User, "id">> {}
export interface UserDTO extends Expand<Pick<User, "displayName" | "email" | "bookingsDTO">> {}

export interface UserNameDTO extends Expand<Pick<User, "id" | "displayName">> {}
