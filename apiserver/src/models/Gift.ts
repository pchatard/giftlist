import {
	Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { UUID } from "../types/UUID";
// import GiftCategory from "./GiftCategory";
import { List } from "./List";

@Entity("Gift", { orderBy: { createdDate: "ASC" } })
export class Gift {
	@PrimaryGeneratedColumn("uuid")
	public id: UUID = uuidv4();

	@Column()
	public title!: string;

	@Column()
	public isBooked: boolean = false;

	@Column()
	public isFavorite: boolean = false;

	@Column()
	public isHidden: boolean = false;

	// Follow https://github.com/typeorm/typeorm/issues/8039
	// @Column({ type: "enum", enum: GiftCategory, default: GiftCategory.OTHER })
	// public category: GiftCategory = GiftCategory.OTHER;
	@Column()
	public category: string = "others";

	@ManyToOne(() => List, (list) => list.gifts)
	public list!: List;

	@RelationId((gift: Gift) => gift.list)
	public listId!: UUID;

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

	// Trouver un moyen de stocker les données des personnes qui réservent en tenant compte de leurs préférences...
	// - bookedBy: List<User> (permettra de réserver des cadeaux à plusieurs)
	// - bookings: List<GiftBooking>

	@CreateDateColumn()
	createdDate!: Date;

	@UpdateDateColumn()
	updatedDate!: Date;
}

export default Gift;
