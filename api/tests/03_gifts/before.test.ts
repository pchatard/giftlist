import {
	Gift1, Gift2, Gift3, Gift4, Gift5, GlobalVar, List1, List2, List3, Url_ListPost
} from "../global";
import { post } from "../helpers/crud";
import { expect200 } from "../helpers/success";

export default async function before(): Promise<void> {
	const list_responses = [
		await post(Url_ListPost(), List1),
		await post(Url_ListPost(), List2),
		await post(Url_ListPost(), List3),
	];
	for (const [index, response] of list_responses.entries()) {
		expect200(response);
		if (index == 0) {
			GlobalVar.List1_Id = response.body.id;
			Gift1.listId = GlobalVar.List1_Id;
			Gift2.listId = GlobalVar.List1_Id;
		}
		if (index == 1) {
			GlobalVar.List2_Id = response.body.id;
			Gift3.listId = GlobalVar.List2_Id;
			Gift4.listId = GlobalVar.List2_Id;
		}
		if (index == 2) {
			GlobalVar.List3_Id = response.body.id;
			Gift5.listId = GlobalVar.List3_Id;
		}
	}
}
