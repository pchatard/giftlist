import {
	Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { email } from "../types/email";
import { UUID } from "../types/UUID";
import List from "./List";

@Entity("User", { orderBy: { createdDate: "ASC" } })
export class User {
	@PrimaryGeneratedColumn("uuid")
	public id: UUID = uuidv4();

	@Column({ unique: true })
	public email!: email;

	@Column()
	public displayName!: string;

	@ManyToMany(() => User)
	@JoinTable({ name: "User_Friends" })
	public friends?: User[];

	@ManyToMany(() => List, (list) => list.owners)
	public lists?: List[];

	@ManyToMany(() => List, (list) => list.grantedUsers)
	public friendLists?: List[];

	@CreateDateColumn()
	createdDate!: Date;
}

export default User;
