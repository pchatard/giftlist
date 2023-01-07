import Gift from "../models/Gift";
import Expand from "./expand";

/* prettier-ignore */
export interface CreateGiftDTO extends Expand<Omit<Gift, "id" | "list" | "listId" | "isBooked" | "bookedBy" | "bookedByDTO" | "createdDate" | "updatedDate">> {}
export interface GiftIdDTO extends Expand<Pick<Gift, "id">> {}

// TODO: Understand why Expand make tsoa going to timeout
/* prettier-ignore */
export type GiftDTO = Pick<Gift, "id" | "title"	| "isBooked" | "bookedByDTO" | "isFavorite"	| "isHidden"	| "category"	| "listId"	| "price"	| "linkURL"	| "brand"	| "size"	| "color"	| "comments">;
/* prettier-ignore */
export interface GiftDTOForOwner extends Expand<Omit<GiftDTO, "isBooked" | "bookedBy" | "bookedByDTO" | "listId" | "list">> {}

export interface EditGiftDTO extends Expand<Omit<GiftDTO, "id" | "listId" | "list">> {}
