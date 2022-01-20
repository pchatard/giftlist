import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Response,
	Route,
	Security,
	SuccessResponse,
	Tags,
} from "tsoa";
import UserService from "./../services/UserService";
import User from "./../models/User";
import { UUID } from "./../types/UUID";
import MailAlreadyUsedError from "./../errors/UserErrors/MailAlreadyUsedError";
import { CreateUserDTO, UserDTO, UserIdDTO } from "./../dto/users";
import { SelectKindList } from "../types/SelectKindList";
import { ListController } from "./ListController";

@Security("auth0") // Follow https://github.com/lukeautry/tsoa/issues/1082 for root-level security
@Route("users")
@Tags("User")
export class UserController extends Controller {
	/**
	 * Create a new user during sign up. Even if users are authenticated and
	 * created by Auth0, we manage a user database to store preferences,
	 * friends and much more.
	 * @param {CreateUserDTO} body data to create a user
	 * @returns {Promise<UUID>} UUID of the created user
	 */
	@SuccessResponse(200)
	@Response<MailAlreadyUsedError>(400, "If mail is already used")
	@Post()
	async create(@Body() body: CreateUserDTO): Promise<UserIdDTO> {
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
	 * Edit a user.
	 * @param {UUID} userId the GUID of user
	 * @param {UserDTO} body data to edit a user
	 */
	@SuccessResponse(204)
	@Put("{userId}")
	async edit(@Path() userId: UUID, @Body() body: Partial<UserDTO>): Promise<void> {
		await UserService.edit(userId, body);
	}

	/**
	 * Delete logged user.
	 * @param {UUID} userId the GUID of user
	 */
	@SuccessResponse(204)
	@Delete("{userId}")
	async delete(@Path() userId: UUID): Promise<void> {
		const listController: ListController = new ListController();
		(await UserService.getUserLists(userId, SelectKindList.ALL)).forEach(async (list) =>
			listController.delete(list.id, userId)
		);
		await UserService.delete(userId);
	}

	/**
	 * Gets all user's data.
	 * @returns {Promise<UserDTO[]>} all users
	 */
	@SuccessResponse(200)
	@Get()
	async getAll(): Promise<UserDTO[]> {
		const users: User[] = await UserService.getAll();
		return users.map((user) => {
			const { id, friends, lists, friendLists, createdDate, ...rest } = user;
			return { ...rest } as UserDTO;
		});
	}

	/**
	 * Gets logged user's data.
	 * @param {UUID} userId the GUID of user
	 * @returns {Promise<UserDTO>} the required user
	 */
	@SuccessResponse(200)
	@Get("{userId}")
	async get(@Path() userId: UUID): Promise<UserDTO> {
		const user: User = await UserService.get(userId);
		const { id, createdDate, ...rest } = user;
		return rest;
	}
}
