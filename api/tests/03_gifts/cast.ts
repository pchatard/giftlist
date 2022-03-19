import { CreateGiftDTO, GiftDTO } from "../../src/dto/gifts";
import { cleanObject } from "../../src/helpers/cleanObjects";
import Gift from "../../src/models/Gift";

export function castAsCreateGiftDTO(gift: Gift): CreateGiftDTO {
	const { id, isBooked, list, listId, updatedDate, createdDate, ...rest } = gift;
	return cleanObject({
		...rest,
	}) as CreateGiftDTO;
}

export function castAsGiftDTO(gift: Gift, showBooked: boolean = false): GiftDTO {
	const { list, updatedDate, createdDate, ...rest } = gift;
	return cleanObject(
		{
			...rest,
		},
		[!showBooked ? "isBooked" : ""]
	) as GiftDTO;
}

export function castArrayAsGiftDTO(gifts: Gift[], showBooked: boolean = false): GiftDTO[] {
	return gifts.map((g) => castAsGiftDTO(g, showBooked));
}
