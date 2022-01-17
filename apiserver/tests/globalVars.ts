import List from "./../src/models/List";
import { CreateUserDTO } from "./../src/dto/users";
import { UUID } from "./../src/types/UUID";

type CreateListDTO = Omit<List, "id" | "createDate" | "updateDate" | "sharingCode" | "owners">;

export default class GlobalVars {
	public static User1: CreateUserDTO;
	public static User2: CreateUserDTO;
	public static User3: CreateUserDTO;
	public static User1_Id: UUID = "";
	public static User2_Id: UUID = "";

	public static List1: CreateListDTO;
	public static List2: CreateListDTO;
}
