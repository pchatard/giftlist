import { DataSource, In } from "typeorm";

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

export async function seed(databaseInstance: DataSource): Promise<any> {
	const userRepo = databaseInstance.getRepository(User);
	const users = userRepo.create([UserTest, User1, User2]);
	await userRepo.save(users);

	const listRepo = databaseInstance.getRepository(List);
	const raw_l: List[] = [
		ListOwned,
		ListGranted,
		ListGrantedButNotShared,
		ListInvited,
		ListUnauthorized,
	];
	const lists = listRepo.create(raw_l);
	for (const [index, list] of lists.entries()) {
		list.owners = await userRepo.findBy({ id: In(raw_l[index].ownersIds) });
		list.grantedUsers = await userRepo.findBy({
			id: In(raw_l[index].grantedUsersIds || []),
		});
	}
	await listRepo.save(lists);

	const giftRepo = databaseInstance.getRepository(Gift);
	const gifts = giftRepo.create([Gift1, Gift2, Gift3, Gift4, Gift5]);
	await giftRepo.save(gifts);
}
