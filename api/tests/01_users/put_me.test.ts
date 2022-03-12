import { expect } from "chai";

import { Url_UserGetMe, Url_UserPutMe, UserTest } from "../global";
import { get, put } from "../helpers/crud";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 204, user informations are changed", async () => {
		const origMail: string = UserTest.email;
		const { id, ...user } = UserTest;
		const response = await put(Url_UserPutMe(), { email: "new@new.fr" });
		expect204(response);
		const changedUser = await get(Url_UserGetMe());
		expect(changedUser)
			.to.have.property("body")
			.to.eql({ ...user, email: "new@new.fr" });
		await put(Url_UserPutMe(), { email: origMail });
	});
}
