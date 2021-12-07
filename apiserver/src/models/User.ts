import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("UserTable")
export class User {
	@PrimaryGeneratedColumn()
	public id: number = 0;

	@Column()
	public email: string = "";

	@ManyToMany(() => User)
	@JoinTable()
	public friends?: User[];

	//@ManyToMany(() => User, (user: User) => user.following)
	//@JoinTable()
	//followers: User[] = [];
	//
	//@ManyToMany(() => User, (user: User) => user.followers)
	//following: User[] = [];
}

export default User;
