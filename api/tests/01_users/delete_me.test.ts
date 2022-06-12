import { expect } from "chai";

import { Url_UserDeleteMe, Url_UserGetAll } from "../global";
import { NewUserTest } from "../global/objects";
import { del, get } from "../helpers/crud";
import { expectError } from "../helpers/error";
import { User1, User2 } from "../seeder/users.seed";

export default function suite() {
	it("Returns 204 and user is no more present", async () => {
		const {
			id: id1,
			bookings: bookings1,
			bookingsDTO: bookingsDTO1,
			createdDate: createdDate1,
			...user1
		} = User1;
		const {
			id: id2,
			bookings: bookings2,
			bookingsDTO: bookingsDTO2,
			createdDate: createdDate2,
			...user2
		} = User2;
		const response = await del(Url_UserDeleteMe());
		expectError(response, 404, "Resource not found"); // Test users are not added to Auth0 DB
		const list = await get(Url_UserGetAll());
		expect(list).to.have.property("body").to.have.deep.members([user1, user2, NewUserTest]);
	});
}
