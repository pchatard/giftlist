import { CreateGiftDTO, GiftDTO } from "../../src/dto/gifts";
import { cleanObject } from "../../src/helpers/cleanObjects";
import Gift from "../../src/models/Gift";

export function castAsCreateGiftDTO(gift: Gift): CreateGiftDTO {
	const { id, list, updatedDate, createdDate, ...rest } = gift;
	return cleanObject({
		...rest,
	}) as CreateGiftDTO;
}

export function castAsGiftDTO(gift: Gift): GiftDTO {
	const { list, updatedDate, createdDate, ...rest } = gift;
	return cleanObject({
		...rest,
	}) as GiftDTO;
}

export function castArrayAsGiftDTO(gifts: Gift[]): GiftDTO[] {
	return gifts.map((g) => castAsGiftDTO(g));
}
