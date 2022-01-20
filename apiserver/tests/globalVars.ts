import { CreateUserDTO } from "./../src/dto/users";
import { UUID } from "./../src/types/UUID";
import { CreateListDTO } from "../src/dto/lists";

export default class GlobalVars {
	public static User1: CreateUserDTO;
	public static User2: CreateUserDTO;
	public static User3: CreateUserDTO;
	public static User1_Id: UUID = "";
	public static User2_Id: UUID = "";

	public static List1: CreateListDTO;
	public static List2: CreateListDTO;
	public static List1_Id: UUID = "";
	public static List2_Id: UUID = "";
}
