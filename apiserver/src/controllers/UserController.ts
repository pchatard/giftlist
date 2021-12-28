import { UUID } from "./../types/express/UUID";
import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Put,
	Response,
	Route,
	Security,
	SuccessResponse,
	Tags,
} from "@tsoa/runtime";
import UserService from "./../services/UserService";
import User from "./../models/User";
import MailAlreadyUsedError from "./../errors/UserErrors/MailAlreadyUsedError";
import MailIsInvalidError from "./../errors/UserErrors/MailIsInvalidError";
import FieldIsMissingError from "./../errors/FieldIsMissingError";
import UserNotFoundError from "./../errors/UserErrors/UserNotFoundError";
import NotUUIDError from "../errors/NotUUIDError";
import { isValidEmail, isValidUUID } from "./../helpers/validators";

type CreateUserDTO = Omit<User, "id" | "friends" | "createdDate">;
type UserIdDTO = Pick<User, "id">;
type UserDTO = Pick<User, "displayName" | "email">;

@Security("auth0") // Follow https://github.com/lukeautry/tsoa/issues/1082 for root-level security
@Route("users")
@Tags("User")
export class UserController extends Controller {
	/**
	 * Create a new user during sign up. Even if users are authenticated and
	 * created by Auth0, we manage a user database to store preferences,
	 * friends and much more.
	 * @param {CreateUserDTO} body data to create a user
	 * @returns {Promise<UserDTO>} the created user
	 */
	@SuccessResponse(200)
	@Response<FieldIsMissingError>(400)
	@Response<MailIsInvalidError>(400)
	@Response<MailAlreadyUsedError>(400)
	@Put("")
	async create(@Body() body: CreateUserDTO): Promise<UserIdDTO> {
		if (!body.email || !body.displayName) {
			throw new FieldIsMissingError(!body.email ? "email" : "displayName");
		}
		if (!isValidEmail(body.email)) {
			throw new MailIsInvalidError();
		}
		try {
			const { id }: User = await UserService.create(body.email, body.displayName);
			return { id } as UserIdDTO;
		} catch (err: any) {
			if ((err.code = "23505" && /^Key \(email\)=\('.*'\) already exists\./.test(err.detail))) {
				throw new MailAlreadyUsedError();
			}
			throw err;
		}
	}

	/**
	 * Delete logged user.
	 * @param {UUID} userID the GUID of user
	 */
	@Delete("{userId}")
	async delete(@Path() userId: UUID): Promise<void> {
		if (!isValidUUID(userId)) {
			throw new NotUUIDError(userId);
		}
		await UserService.delete(userId);
	}

	/**
	 * Gets all user's data.
	 * @returns {Promise<User>} the user
	 */
	@Get()
	async getAll(): Promise<UserDTO[]> {
		const users: User[] = await UserService.getAll();
		return users.map((user) => {
			const { id, friends, createdDate, ...rest } = user;
			return { ...rest } as UserDTO;
		});
	}

	/**
	 * Gets logged user's data.
	 * @param {UUID} userID the GUID of user
	 * @returns {Promise<UserDTO>} the user
	 */
	@Get("{userId}")
	async get(@Path() userId: UUID): Promise<UserDTO> {
		if (!isValidUUID(userId)) {
			throw new NotUUIDError(userId);
		}
		const user: User | undefined = await UserService.get(userId);
		if (!user) {
			throw new UserNotFoundError();
		} else {
			const { id, createdDate, ...rest } = user;
			return rest;
		}
	}
}
