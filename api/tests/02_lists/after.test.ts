// import { expect } from "chai";

import { Url_UserDelete, User3 } from "../global";
import { del } from "../helpers/crud";

// import { expect204 } from "../helpers/success";

export default async function after(): Promise<void> {
	await del(Url_UserDelete(User3.id));
	// await del(Url_UserDelete(GlobalVar.User2_Id));
	// const response = await del(Url_UserDelete(GlobalVar.User1_Id));
	// expect204(response);
	// let users = await get(Url_UserGetAll());
	// expect(users).to.have.property("body").to.eql([]);
}
