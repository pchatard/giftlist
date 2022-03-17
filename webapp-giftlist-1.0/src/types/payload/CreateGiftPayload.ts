import { CreateGiftDTO } from "../dto/CreateGiftDTO";
import { GiftIdPayload } from "./GiftIdPayload";

export interface CreateGiftPayload extends GiftIdPayload {
    gift: CreateGiftDTO;
}