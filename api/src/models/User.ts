import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

import { email } from "../types/email";
import List from "./List";

@Entity("User", { orderBy: { createdDate: "ASC" } })
export class User {
	@PrimaryColumn()
	public id!: string;

	@Column()
	public email!: email;

	@Column()
	public displayName!: string;

	@ManyToMany(() => User)
	@JoinTable({ name: "User_Friends" })
	public friends?: this[];

	@ManyToMany(() => List, (list) => list.owners)
	public lists?: List[];

	@ManyToMany(() => List, (list) => list.grantedUsers)
	public friendLists?: List[];

	@CreateDateColumn()
	createdDate!: Date;
}

export default User;
