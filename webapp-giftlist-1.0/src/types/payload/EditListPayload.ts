import { PartialListDTO } from "../dto/PartialListDTO";
import { GiftlistPayload } from "./GiftlistPayload";

export interface EditListPayload extends GiftlistPayload {
	listId: string;
	partialList: PartialListDTO;
}
