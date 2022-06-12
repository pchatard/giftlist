import { GiftDTO, GiftDTOForOwner } from "../dto/gifts";
import { Gift } from "../models/Gift";
import { cleanObject } from "./cleanObjects";
import { castUserAsUserNameDTO } from "./users";

export function castGiftAsGiftDTO(gift: Gift, isOwner: boolean): GiftDTO | GiftDTOForOwner {
	const { list, bookedBy, createdDate, updatedDate, ...rest } = gift;
	rest.bookedByDTO = (bookedBy || []).map((u) => castUserAsUserNameDTO(u));
	return cleanObject(rest, isOwner ? ["isBooked", "bookedBy", "bookedByDTO"] : [""]) as
		| GiftDTO
		| GiftDTOForOwner;
}
