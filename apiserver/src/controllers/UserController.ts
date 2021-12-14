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
import UserService from "../services/UserService";
import User from "../models/User";
import MailAlreadyUsedError from "../errors/UserErrors/MailAlreadyUsedError";
import MailIsInvalidError from "../errors/UserErrors/MailIsInvalidError";
import FieldIsMissingError from "../errors/FieldIsMissingError";
import UserNotFoundError from "../errors/UserErrors/UserNotFoundError";

type CreateUserDTO = Omit<User, "id" | "friends">;
type UserDTO = Pick<User, "id">;

const EMAIL_REGEX =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Security("bearerAuth") // Follow https://github.com/lukeautry/tsoa/issues/1082 for root-level security
@Route("users")
@Tags("User")
class UserController extends Controller {
	/**
	 * Create a new user during sign up. Even if users are authenticated and
	 * created by Auth0, we manage a user database to store preferences,
	 * friends and much more.
	 * @param {CreateUserDTO} body data to create a user
	 * @returns {Promise<UserDTO>} the created user
	 */
	@SuccessResponse(200)
	@Response<Error>(400)
	@Put("/")
	static async create(@Body() body: CreateUserDTO): Promise<UserDTO> {
		if (!body.email || !body.displayName) {
			throw new FieldIsMissingError(!body.email ? "email" : "displayName");
		}
		if (!EMAIL_REGEX.test(body.email)) {
			throw new MailIsInvalidError();
		}
		try {
			const { id }: User = await UserService.create(
				body.email,
				body.displayName
			);
			return { id } as UserDTO;
		} catch (err: any) {
			if ((err.code = "23505" && /^Key \(email\)=\('.*'\) already exists\./.test(err.detail))) {
				throw new MailAlreadyUsedError();
			}
			throw err;
		}
	}

	/**
	 * Delete logged user.
	 */
	@Delete("/{userId}")
	static async delete(@Path() userId: string): Promise<void> {
		await UserService.delete(userId);
	}

	/**
	 * Gets logged user's data.
	 * @returns {Object} - User object
	 */
	@Get("/{userId}")
	static async get(@Path() userId: string): Promise<User> {
		const user: User | undefined = await UserService.get(userId)
		if (!user) {
			throw new UserNotFoundError();
		} else {
			return user;
		}
	}
}

export default UserController;
