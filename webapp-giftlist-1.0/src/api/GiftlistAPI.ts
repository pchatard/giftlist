import { axiosInstance as axios } from "@/main";
import store from "@/store";
import { SnackbarState } from "@/store/snackbar";
import { SnackbarEventEnum } from "@/types/SnackbarEventEnum";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { AxiosError, AxiosRequestHeaders } from "axios";
import { inject } from "vue";

export default class GiftlistAPI {
	static async getAuthToken() {
		const auth: Auth0Client | undefined = inject("Auth");
		const token = await auth?.getTokenSilently();
		return token;
	}

	static showErrorSnackbar(error: Error) {
		const snackbar: SnackbarState = {
			message: (error as Error).message,
			type: SnackbarEventEnum.ERROR,
		};
		store.dispatch("showSnackbar", snackbar);
	}

	static async get(path: string, queryParams?: Record<string, unknown>) {
		const token = await this.getAuthToken();
		try {
			return axios.get(path, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: queryParams,
			});
		} catch (error) {
			throw error as Error;
		}
	}

	static async post(
		path: string,
		body?: Record<string, unknown>,
		queryParams?: Record<any, unknown>
	) {
		const token = await this.getAuthToken();
		return axios.post(path, body, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: queryParams,
		});
	}

	static async put(
		path: string,
		body?: Record<string, unknown>,
		queryParams?: Record<string, unknown>
	) {
		const token = await this.getAuthToken();
		return axios.put(path, body, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: queryParams,
		});
	}

	static async delete(path: string, queryParams?: Record<string, unknown>) {
		const token = await this.getAuthToken();
		return axios.delete(path, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: queryParams,
		});
	}
}
