import { GiftlistPayload } from "./GiftlistPayload";

export interface GetListsPayload extends GiftlistPayload {
    select: "owned" | "granted";
}