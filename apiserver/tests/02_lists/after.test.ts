import { expect } from "chai";
import { GlobalVar, Url_UserDelete, Url_UserGetAll } from "./../global";
import { del, get } from "./../helpers/crud";
import { expect204 } from "./../helpers/success";

export default async function after(): Promise<void> {
	await del(Url_UserDelete(GlobalVar.User3_Id));
	await del(Url_UserDelete(GlobalVar.User2_Id));
	const response = await del(Url_UserDelete(GlobalVar.User1_Id));
	expect204(response);
	let users = await get(Url_UserGetAll());
	expect(users).to.have.property("body").to.eql([]);
}
