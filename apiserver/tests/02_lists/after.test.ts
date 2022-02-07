import { expect } from "chai";
import { BaseUrl_Users, GlobalVar } from "../global";
import { del, get } from "../helpers/crud";
import { expect204 } from "../helpers/success";

export default async function after(): Promise<void> {
	const response = await del(BaseUrl_Users + "/" + GlobalVar.User1_Id);
	expect204(response);
	await del(BaseUrl_Users + "/" + GlobalVar.User2_Id);
	let users = await get(BaseUrl_Users + "/");
	expect(users).to.have.property("body").to.eql([]);
}
