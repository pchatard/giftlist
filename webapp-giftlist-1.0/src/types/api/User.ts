import { GiftBooking } from "./GiftBooking";
import { List } from "./List";
import { Preference } from "./Preference";

export interface User {
    email: string,
    username: string,
    friends: User[],
    lists: List[],
    bookedGifts: GiftBooking[],
    bookingPreferences: Preference[]
}
