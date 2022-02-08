import { GlobalVar } from "./../global";
import { BaseUrl_Users, List1, List2, User1, User2 } from "./../global";
import { post } from "./../helpers/crud";
import { expect200 } from "./../helpers/success";

export default async function before(): Promise<void> {
	const responses = [await post(BaseUrl_Users, User1), await post(BaseUrl_Users, User2)];
	responses.forEach((response, index) => {
		expect200(response);
		if (index == 0) {
			GlobalVar.User1_Id = response.body.id;
			List1.ownersIds.push(GlobalVar.User1_Id);
			List2.ownersIds.push(GlobalVar.User1_Id);
		}
		if (index == 1) {
			GlobalVar.User2_Id = response.body.id;
			List2.grantedUsersIds?.push(GlobalVar.User2_Id);
		}
	});
}
