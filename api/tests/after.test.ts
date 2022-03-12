import "mocha";

import { NewUserTest, Url_UserDelete } from "./global";
import { del } from "./helpers/crud";
import { User1, User2 } from "./seeder/users.seed";

after(async () => {
	await del(Url_UserDelete(User1.id));
	await del(Url_UserDelete(User2.id));
	await del(Url_UserDelete(NewUserTest.id));
	//await del(Url_UserDeleteMe());
});