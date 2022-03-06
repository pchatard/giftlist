import { axiosInstance as axios } from "@/main";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { inject } from "vue";

export default class GiftlistAPI {
	static async getAuthToken() {
		const auth: Auth0Client | undefined = inject("Auth");
		const token = await auth?.getTokenSilently();
		return token;
	}

	static async get(path: string, queryParams?: Record<string, unknown>) {
		const token = await this.getAuthToken();
		return axios.get(path, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: queryParams,
		});
	}
}
