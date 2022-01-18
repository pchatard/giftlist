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
import List from "./../models/List";
import User from "./../models/User";
import ListService from "./../services/ListService";
import UserService from "./../services/UserService";
import OwnershipError from "./../errors/UserErrors/OwnershipError";
import { UUID } from "./../types/UUID";
import { SelectKindList } from "./../types/SelectKindList";
import { CreateListDTO, ListDTO, ListIdDTO } from "./../dto/lists";

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
		const users: User[] = await UserService.getMany(body.ownersIds);
		const { id }: List = await ListService.create({ ...body, owners: users });
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
		if (!(await ListService.listOwners(listId)).includes(userId)) {
			throw new OwnershipError();
		}
		await ListService.edit(listId, body);
	}

	/**
	 * Delete a list.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204)
	@Delete("{listId}")
	async delete(@Path() listId: UUID, @Query() userId: UUID): Promise<void> {
		const ownerIds: UUID[] = await ListService.listOwners(listId);
		const grantedIds: UUID[] = await ListService.listGrantedUsers(listId);
		// One of owner or granted user
		if (ownerIds.includes(userId) || grantedIds.includes(userId)) {
			await ListService.forget(listId, userId);
			// Last Owner
			if (ownerIds.length == 1 && ownerIds.includes(userId)) {
				await ListService.delete(listId);
			}
		// None of that
		} else {
			throw new OwnershipError();
		}
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
		if (!(await ListService.listOwners(listId)).includes(userId)) {
			throw new OwnershipError();
		}
		const { id, grantedUsers, owners, createdDate, updatedDate, ...rest }: List =
			await ListService.get(listId);
		return rest as ListDTO;
	}

	/**
	 * Make a list to public.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204)
	@Put("{listId}/share")
	async share(@Path() listId: UUID, @Query() userId: UUID): Promise<void> {
		this.edit(listId, { isShared: true }, userId);
	}

	/**
	 * Make a list private.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204)
	@Put("{listId}/unshare")
	async private(@Path() listId: UUID, @Query() userId: UUID): Promise<void> {
		this.edit(listId, { isShared: false }, userId);
	}

	/**
	 * Get a list from its sharing code.
	 * @param {UUID} sharingCode the sharing code of the list
	 */
	@SuccessResponse(204)
	@Put("invite/{sharingCode}")
	async accessFromSharingCode(@Path() sharingCode: UUID, @Query() userId: UUID): Promise<void> {
		const list: List = await ListService.getFromSharingCode(sharingCode);
		const user: User = await UserService.get(userId);
		await ListService.edit(list.id, { owners: [...list.owners, user] });
	}
}
