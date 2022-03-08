import { Gift1, Gift2, Gift3, Gift4, Gift5, GlobalVar, ListTest, Url_ListPost } from "../global";
import { post } from "../helpers/crud";
import { expect200 } from "../helpers/success";
import { List1, List2, List3 } from "../seeder/lists.seed";

export default async function before(): Promise<void> {
	const response = await post(Url_ListPost(), ListTest);
	expect200(response);
	GlobalVar.ListTest_Id = response.body.id;
	Gift1.listId = List1.id;
	Gift2.listId = List1.id;
	Gift3.listId = List2.id;
	Gift4.listId = List2.id;
	Gift5.listId = List3.id;
}
