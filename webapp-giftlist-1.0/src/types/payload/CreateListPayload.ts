import { CreateListDTO } from "../dto/CreateListDTO";
import { GiftlistPayload } from "./GiftlistPayload";

export interface CreateListPayload extends GiftlistPayload {
	newList: CreateListDTO;
}
