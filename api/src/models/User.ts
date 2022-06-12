import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

import { GiftDTO } from "../dto/gifts";
import { email } from "../types/email";
import { UUID } from "../types/UUID";
import { Gift } from "./Gift";
import List from "./List";

@Entity("User", { orderBy: { createdDate: "ASC" } })
export class User {
	@PrimaryGeneratedColumn("uuid")
	public id!: UUID;

	@Column()
	public auth0Id!: string;

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

	@ManyToMany(() => Gift, (gift) => gift.bookedBy)
	@JoinTable({ name: "User_Bookings" })
	public bookings!: Gift[];

	public bookingsDTO?: GiftDTO[];

	@CreateDateColumn()
	createdDate!: Date;
}

export default User;
