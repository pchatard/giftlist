import { GiftlistPayload } from "./GiftlistPayload";

export interface ListSharingCodePayload extends GiftlistPayload {
    sharingCode: string;
}