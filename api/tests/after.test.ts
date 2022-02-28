import "mocha";

import { Url_UserDelete, Url_UserDeleteMe, User1, User2 } from "./global";
import { del } from "./helpers/crud";

after(async () => {
	await del(Url_UserDelete(User1.id));
	await del(Url_UserDelete(User2.id));
	await del(Url_UserDeleteMe());
});
