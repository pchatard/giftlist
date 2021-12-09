import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class User {
	@PrimaryGeneratedColumn()
	public id: number = 0;

	@Column()
	public email: string = "";

	@Column()
	public displayName: string = "";

	@ManyToMany(() => User)
	@JoinTable()
	public friends?: User[];
}

export default User;
