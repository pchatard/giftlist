import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	RelationId,
	UpdateDateColumn,
} from "typeorm";

import { UserNameDTO } from "../dto/users";
import { UUID } from "../types/UUID";
import { Gift } from "./Gift";
import User from "./User";

@Entity("List", { orderBy: { createdDate: "ASC" } })
export class List {
	@PrimaryGeneratedColumn("uuid")
	public id!: UUID;

	@Column()
	public title!: string;

	@Column({ nullable: true })
	public description?: string;

	@Column({ nullable: true })
	public closureDate?: Date;

	@ManyToMany(() => User, (user) => user.lists)
	@JoinTable({ name: "List_Owners" })
	public owners!: User[];

	@RelationId((list: List) => list.owners)
	public ownersIds!: UUID[];

	public ownersDTO?: UserNameDTO[];

	@Column({ default: false })
	public isShared!: boolean;

	@Column({ generated: "uuid", unique: true, update: false })
	public sharingCode!: UUID;

	@ManyToMany(() => User, (user) => user.friendLists)
	@JoinTable({ name: "List_GrantedUsers" })
	public grantedUsers?: User[];

	@RelationId((list: List) => list.grantedUsers)
	public grantedUsersIds?: UUID[];

	public grantedUsersDTO?: UserNameDTO[];

	@OneToMany(() => Gift, (gift) => gift.list)
	public gifts?: Gift[];

	@CreateDateColumn()
	createdDate!: Date;

	@UpdateDateColumn()
	updatedDate!: Date;
}

export default List;
