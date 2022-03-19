import { CreateGiftDTO } from "../dto/CreateGiftDTO";
import { ListIdPayload } from "./ListIdPayload";

export interface CreateGiftPayload extends ListIdPayload {
	gift: CreateGiftDTO;
}
