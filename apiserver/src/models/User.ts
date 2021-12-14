import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("User")
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
}

export default User;
