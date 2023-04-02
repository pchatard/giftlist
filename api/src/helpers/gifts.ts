import { GiftDTO, GiftDTOForOwner } from "../dto/gifts";
import { Gift } from "../models/Gift";
import { cleanObject } from "./cleanObjects";
import { castUserAsUserNameDTO } from "./users";

export function castGiftAsGiftDTO(
	gift: Gift,
	isOwner: boolean,
	userId: string
): GiftDTO | GiftDTOForOwner {
	const { list, bookedBy, createdDate, updatedDate, ...rest } = gift;
	rest.bookedByDTO = (bookedBy || []).map((u) => castUserAsUserNameDTO(u));
	rest.isBookedByMe = rest.isBooked && (bookedBy || []).some((u) => u.auth0Id == userId);
	return cleanObject(
		rest,
		isOwner ? ["isBooked", "bookedBy", "bookedByDTO", "isBookedByMe"] : [""]
	) as GiftDTO | GiftDTOForOwner;
}
