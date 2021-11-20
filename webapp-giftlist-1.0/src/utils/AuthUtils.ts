import { axiosInstance as axios } from "@/main";

export default class AuthUtils {
	static login = (credentials: any) => {
		return axios.post("/login", { ...credentials });
	};

	static register = (credentials: any): Promise<any> => {
		return axios.post("/register", { ...credentials });
	};

	static logout = (): Promise<any> => {
		return axios.get("/logout");
	};

	static getUser = (): Promise<any> => {
		return axios.get("/me");
	};
}
