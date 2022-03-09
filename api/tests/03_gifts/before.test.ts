import { expect } from "chai";

import { GlobalVar, ListTest } from "../global";
import { Url_ListPost } from "../global/urls";
import { post } from "../helpers/crud";
import { expect200 } from "../helpers/success";

export default async function before(): Promise<void> {
	const response = await post(Url_ListPost(), ListTest);
	expect200(response);
	expect(response).to.have.property("body").to.have.property("id").to.be.a.string;
	GlobalVar.ListTest_Id = response.body.id;
}
