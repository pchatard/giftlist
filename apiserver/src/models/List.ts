import {
	Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { UUID } from "../types/UUID";
import { Gift } from "./Gift";
import User from "./User";

@Entity("List", { orderBy: { createdDate: "ASC" } })
export class List {
	@PrimaryGeneratedColumn("uuid")
	public id: UUID = uuidv4();

	@Column()
	public title!: string;

	@Column({ nullable: true })
	public closureDate?: Date;

	@ManyToMany(() => User, (user) => user.lists)
	@JoinTable({ name: "List_Owners" })
	public owners!: User[];

	public ownersIds!: UUID[];

	@Column()
	public isShared: boolean = false;

	@Column({ generated: "uuid", unique: true, update: false })
	public sharingCode: UUID = uuidv4();

	@ManyToMany(() => User, (user) => user.friendLists)
	@JoinTable({ name: "List_GrantedUsers" })
	public grantedUsers?: User[];

	public grantedUsersIds?: UUID[];

	@OneToMany(() => Gift, (gift) => gift.list)
	public gifts!: Gift[];

	@CreateDateColumn()
	createdDate!: Date;

	@UpdateDateColumn()
	updatedDate!: Date;
}

export default List;
