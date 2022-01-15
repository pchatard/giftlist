import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Query,
	Route,
	Security,
	SuccessResponse,
	Tags,
} from "tsoa";
import List from "../models/List";
import User from "../models/User";
import ListService from "../services/ListService";
import UserService from "../services/UserService";
import ListNotFoundError from "../errors/ListErrors/ListNotFoundError";
import UserNotFoundError from "../errors/UserErrors/UserNotFoundError";
import OwnershipError from "../errors/UserErrors/OwnershipError";
import { UUID } from "../types/UUID";
import { SelectKindList } from "../types/SelectKindList";
import { cleanObject } from "../helpers/cleanObjects";

// TODO: Follow https://github.com/lukeautry/tsoa/issues/911 to remove this workaround
type Expand<T> = { [K in keyof T]: T[K] };
interface CreateListDTO
	extends Expand<Omit<List, "id" | "sharingCode" | "createdDate" | "updatedDate">> {}
interface ListIdDTO extends Expand<Pick<List, "id">> {}
interface ListDTO
	extends Expand<Pick<List, "title" | "isShared" | "sharingCode" | "closureDate">> {}

@Security("auth0") // Follow https://github.com/lukeautry/tsoa/issues/1082 for root-level security
@Route("lists")
@Tags("List")
export class ListController extends Controller {
	/**
	 * Creates a new list.
	 */
	@SuccessResponse(200)
	@Post()
	async create(@Body() body: CreateListDTO): Promise<ListIdDTO> {
		const { id }: List = await ListService.create(body);
		return { id } as ListIdDTO;
	}

	/**
	 * Edit a list.
	 * @param {UUID} listId the GUID of the list
	 * @param {ListDTO} body data to edit a list
	 */
	@SuccessResponse(204)
	@Put("{listId}")
	async edit(
		@Path() listId: UUID,
		@Body() body: Partial<ListDTO>,
		@Query() userId: UUID
	): Promise<void> {
		if (!(await ListService.checkOwnership(listId, userId))) {
			throw new OwnershipError();
		}
		await ListService.edit(listId, cleanObject(body));
	}

	/**
	 * Delete a list.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204)
	@Delete("{listId}")
	async delete(@Path() listId: UUID, @Query() userId: UUID): Promise<void> {
		if (!(await ListService.checkOwnership(listId, userId))) {
			throw new OwnershipError();
		}
		await ListService.delete(listId);
	}

	/**
	 * Gets all user's lists data.
	 * @returns {Promise<ListDTO[]>} all user lists
	 */
	@SuccessResponse(200)
	@Get()
	async getAll(@Query() userId: UUID, @Query() select: SelectKindList): Promise<ListDTO[]> {

		const lists: List[] = await UserService.getUserLists(userId, select);
		return lists.map((list) => {
			const { id, grantedUsers, owners, createdDate, updatedDate, ...rest } = list;
			return { ...rest } as ListDTO;
		});
	}

	/**
	 * Sends back a list in the response based on its id.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(200)
	@Get("{listId}")
	async get(@Path() listId: UUID, @Query() userId: UUID): Promise<ListDTO> {
		if (!(await ListService.checkOwnership(listId, userId))) {
			throw new OwnershipError();
		}
		const list: List | undefined = await ListService.get(listId);
		if (!list) {
			throw new ListNotFoundError();
		} else {
			const { id, grantedUsers, owners, createdDate, updatedDate, ...rest } = list;
			return rest as ListDTO;
		}
	}

	/**
	 * Make a list to public.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204)
	@Put("{listId}/share")
	async share(@Path() listId: UUID, @Query() userId: UUID): Promise<void> {
		if (!(await ListService.checkOwnership(listId, userId))) {
			throw new OwnershipError();
		}
		await ListService.edit(listId, { isShared: true });
	}

	/**
	 * Make a list private.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204)
	@Put("{listId}/unshare")
	async private(@Path() listId: UUID, @Query() userId: UUID): Promise<void> {
		if (!(await ListService.checkOwnership(listId, userId))) {
			throw new OwnershipError();
		}
		await ListService.edit(listId, { isShared: false });
	}

	/**
	 * Get a list from its sharing code.
	 * @param {UUID} sharingCode the sharing code of the list
	 */
	@SuccessResponse(204)
	@Get("invite/{sharingCode}")
	async accessFromSharingCode(@Path() sharingCode: UUID, @Query() userId: UUID): Promise<void> {
		const list: List | undefined = await ListService.getFromSharingCode(sharingCode);
		const user: User | undefined = await UserService.get(userId);
		if (!list) {
			throw new ListNotFoundError();
		} else if (!user) {
			throw new UserNotFoundError();
		} else {
			await ListService.edit(list.id, { owners: [...list.owners, user] });
		}
	}
}
