import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	RelationId,
	UpdateDateColumn,
} from "typeorm";

import { UserNameDTO } from "../dto/users";
import { UUID } from "../types/UUID";
// import GiftCategory from "./GiftCategory";
import { List } from "./List";
import User from "./User";

@Entity("Gift", { orderBy: { createdDate: "ASC" } })
export class Gift {
	@PrimaryGeneratedColumn("uuid")
	public id!: UUID;

	@Column()
	public title!: string;

	@Column({ default: false })
	public isFavorite!: boolean;

	@Column({ default: false })
	public isHidden!: boolean;

	// Follow https://github.com/typeorm/typeorm/issues/8039
	// @Column({ type: "enum", enum: GiftCategory, default: GiftCategory.OTHER })
	// public category: GiftCategory = GiftCategory.OTHER;
	@Column({ default: "others" })
	public category!: string;

	@ManyToOne(() => List, (list) => list.gifts)
	public list!: List;

	@RelationId((gift: Gift) => gift.list)
	public listId!: UUID;

	@Column({ default: false })
	public isBooked!: boolean;

	@ManyToMany(() => User, (user) => user.bookings)
	public bookedBy!: User[];

	public bookedByDTO!: UserNameDTO[];

	@Column({ nullable: true })
	public price?: number;

	@Column({ nullable: true })
	public linkURL?: string;

	@Column({ nullable: true })
	public brand?: string;

	@Column({ nullable: true })
	public size?: string;

	@Column({ nullable: true })
	public color?: string;

	@Column({ nullable: true })
	public comments?: string;

	@CreateDateColumn()
	createdDate!: Date;

	@UpdateDateColumn()
	updatedDate!: Date;
}

export default Gift;
