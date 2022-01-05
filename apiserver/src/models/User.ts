import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "../types/UUID";
import { email } from "../types/email";

@Entity("User", { orderBy: { createdDate: "ASC" } })
export class User {
	@PrimaryGeneratedColumn("uuid")
	public id: UUID = uuidv4();

	@Column({ unique: true })
	public email: email = "";

	@Column()
	public displayName: string = "";

	@ManyToMany(() => User)
	@JoinTable()
	public friends?: User[];

	@CreateDateColumn()
	createdDate?: Date;
}

export default User;
