import { PartialGiftDTO } from "../dto/PartialGiftDTO";
import { GiftIdPayload } from "./GiftIdPayload";

export interface EditGiftPayload extends GiftIdPayload {
	partialGift: PartialGiftDTO;
}
