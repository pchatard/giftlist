import { Url_UserPost, UserTest } from "../global";
import { post } from "../helpers/crud";
import { expect200 } from "../helpers/success";

export default async function before(): Promise<void> {
	const response = await post(Url_UserPost(), UserTest);
	expect200(response);
}
