import { GlobalVar, List1, List2, List3, Url_UserPost, User1, User2, User3 } from "../global";
import { post } from "../helpers/crud";
import { expect200 } from "../helpers/success";

export default async function before(): Promise<void> {
	const responses = [
		await post(Url_UserPost(), User1),
		await post(Url_UserPost(), User2),
		await post(Url_UserPost(), User3),
	];
	for (const [index, response] of responses.entries()) {
		expect200(response);
		if (index == 0) {
			GlobalVar.User1_Id = response.body.id;
			List1.ownersIds.push(GlobalVar.User1_Id);
			List2.ownersIds.push(GlobalVar.User1_Id);
			List3.ownersIds.push(GlobalVar.User1_Id);
		}
		if (index == 1) {
			GlobalVar.User2_Id = response.body.id;
			List2.grantedUsersIds?.push(GlobalVar.User2_Id);
			List3.ownersIds.push(GlobalVar.User2_Id);
		}
		if (index == 2) {
			GlobalVar.User3_Id = response.body.id;
		}
	}
}
