import Gift from "../models/Gift";
import Expand from "./expand";

export interface CreateGiftDTO
	extends Expand<Omit<Gift, "id" | "list" | "createdDate" | "updatedDate">> {}
export interface GiftIdDTO extends Expand<Pick<Gift, "id">> {}

// TODO: Understand why Expand make tsoa going to timeout
export type GiftDTO = Pick<
	Gift,
	| "title"
	| "isBooked"
	| "isFavorite"
	| "isHidden"
	| "category"
	| "listId"
	| "price"
	| "linkURL"
	| "brand"
	| "size"
	| "color"
	| "comments"
>;
