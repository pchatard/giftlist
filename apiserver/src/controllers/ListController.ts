import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Route,
	Security,
	SuccessResponse,
	Tags,
} from "tsoa";
import List from "../models/List";
import ListService from "../services/ListService";
//import { v4 as uuidv4 } from "uuid";
import { UUID } from "../types/UUID";
//import { cleanObject } from "../helpers/cleanObjects";

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
	@Put("{_listId}")
	async edit(@Path() _listId: UUID, @Body() _body: Partial<ListDTO>): Promise<void> {
		// await ListService.edit(listId, cleanObject(body));
	}

	/**
	 * Delete a list.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204)
	@Delete("{_listId}")
	async delete(@Path() _listId: UUID): Promise<void> {
		// await ListService.delete(listId);
	}

	/**
	 * Gets all user's lists data.
	 * @returns {Promise<ListDTO[]>} all user lists
	 */
	@SuccessResponse(200)
	@Get()
	async getAll(): Promise<void> {
		// const userId = req.user["https://giftlist-api/email"];
		// const lists: List[] = await ListService.getAll();
		// return lists.map((list) => {
		// 	const { id, createdDate, ...rest } = list;
		// 	return { ...rest } as ListDTO;
		// });
	}

	/**
	 * Sends back a list in the response based on its id.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(200)
	@Get("{_listId}")
	async get(@Path() _listId: UUID): Promise<void> {
		// const list: List | undefined = await ListService.get(listId);
		// if (!list) {
		// 	throw new ListNotFoundError();
		// } else {
		// 	const { id, createdDate, ...rest } = list;
		// 	return rest;
		// }
	}

	/**
	 * Creates a sharing code for a list to make it public.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204)
	@Put("{_listId}/share")
	async share(@Path() _listId: UUID): Promise<void> {
		// return await ListService.share(listId);
	}

	/**
	 * Makes a list private.
	 * @param {UUID} listId the GUID of the list
	 */
	@SuccessResponse(204)
	@Put("{_listId}/unshare")
	async private(@Path() _listId: UUID): Promise<void> {
		// await ListService.unshare(listId);
	}

	/**
	 * Get a list from its sharing code.
	 * @param {UUID} sharingCode the sharing code of the list
	 */
	@SuccessResponse(204)
	@Get("invite/{_sharingCode}")
	async getFromSharingCode(@Path() _sharingCode: UUID): Promise<void> {
		// // Retrieve the list from the sharing code
		// const sharedList: List = (await ListService.getSharedList(sharingCode));
		// const userId = req.user["https://giftlist-api/email"];
		// // Add the user to the list's sharedWith property if not already done
		// if (!sharedList.sharedWith.includes(userId)) {
		// 	ListService.addUserToList(userId, sharedList.id);
		// }
	}
}
