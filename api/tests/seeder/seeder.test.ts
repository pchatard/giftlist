import { Connection } from "typeorm";
import { Factory, Seeder as TSeeder } from "typeorm-seeding";

import List from "../../src/models/List";
import User from "../../src/models/User";
import { UserTest } from "../global";
import { List1, List2, List3 } from "./lists.seed";
import { User1, User2 } from "./users.seed";

export default class Seeder implements TSeeder {
	public async run(_factory: Factory, connection: Connection): Promise<any> {
		const users = connection.manager.create(User, [UserTest, User1, User2]);
		await connection.manager.save(users);
		const raw_l = [List1, List2, List3];
		const lists = connection.manager.create(List, raw_l);
		for (const [index, list] of lists.entries()) {
			list.owners = await connection.manager.findByIds(User, raw_l[index].ownersIds);
			list.grantedUsers = await connection.manager.findByIds(
				User,
				raw_l[index].grantedUsersIds || []
			);
		}
		await connection.manager.save(lists);
	}
}
