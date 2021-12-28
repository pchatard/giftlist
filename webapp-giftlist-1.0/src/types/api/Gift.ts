import { GiftBooking } from "./GiftBooking";
import { GiftCategory } from "./GiftCategory";
import { List } from "./List";
import { User } from "./User";

export interface Gift {
	readonly id: string;
	title: string;
	isFavorite: boolean;
	category: GiftCategory;
	lists: List[];
	price?: number;
	link?: string;
	brand?: string;
	size?: string;
	color?: string;
	comments?: string;
	isHidden?: boolean;
	isBooked: boolean;
	bookedBy?: User[];
	bookings?: GiftBooking[];
}
