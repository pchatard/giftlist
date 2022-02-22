import {
	Gift1, Gift2, Gift3, GlobalVar, List1, List2, Url_ListPost, Url_UserPost, User1, User2
} from "../global";
import { post } from "../helpers/crud";
import { expect200 } from "../helpers/success";

export default async function before(): Promise<void> {
	const user_responses = [await post(Url_UserPost(), User1), await post(Url_UserPost(), User2)];
	for (const [index, response] of user_responses.entries()) {
		expect200(response);
		if (index == 0) {
			GlobalVar.User1_Id = response.body.id;
			List1.ownersIds.push(GlobalVar.User1_Id);
			List2.ownersIds.push(GlobalVar.User1_Id);
		}
		if (index == 1) {
			GlobalVar.User2_Id = response.body.id;
			List1.grantedUsersIds?.push(GlobalVar.User2_Id);
		}
	}
	const list_responses = [await post(Url_ListPost(), List1), await post(Url_ListPost(), List2)];
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
		}
	}
}
