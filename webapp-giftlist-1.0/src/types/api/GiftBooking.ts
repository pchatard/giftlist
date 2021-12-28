import { Gift } from "./Gift";
import { User } from "./User";

export interface GiftBooking {
	user: User;
	gift: Gift;
	showName: boolean;
}
