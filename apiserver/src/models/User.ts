import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("User", { orderBy: { createdDate: "ASC" } })
export class User {
	@PrimaryGeneratedColumn("uuid")
	public id: string = uuidv4();

	@Column({ unique: true })
	public email: string = "";

	@Column()
	public displayName: string = "";

	@ManyToMany(() => User)
	@JoinTable()
	public friends?: User[];

	@CreateDateColumn()
	createdDate?: Date;
}

export default User;
