import { Connection } from "typeorm";
import { Factory, Seeder as TSeeder } from "typeorm-seeding";

import Gift from "../../src/models/Gift";
import List from "../../src/models/List";
import User from "../../src/models/User";
import { Gift1, Gift2, Gift3, Gift4, Gift5 } from "./gifts.seed";
import {
	ListGranted,
	ListGrantedButNotShared,
	ListInvited,
	ListOwned,
	ListUnauthorized,
} from "./lists.seed";
import { User1, User2, UserTest } from "./users.seed";

export default class Seeder implements TSeeder {
	public async run(_factory: Factory, connection: Connection): Promise<any> {
		const users = connection.manager.create(User, [UserTest, User1, User2]);
		await connection.manager.save(users);
		const raw_l = [
			ListOwned,
			ListGranted,
			ListGrantedButNotShared,
			ListInvited,
			ListUnauthorized,
		];
		const lists = connection.manager.create(List, raw_l);
		for (const [index, list] of lists.entries()) {
			list.owners = await connection.manager.findByIds(User, raw_l[index].ownersIds);
			list.grantedUsers = await connection.manager.findByIds(
				User,
				raw_l[index].grantedUsersIds || []
			);
		}
		await connection.manager.save(lists);

		const raw_g = [Gift1, Gift2, Gift3, Gift4, Gift5];
		const gifts = connection.manager.create(Gift, raw_g);
		await connection.manager.save(gifts);
	}
}
