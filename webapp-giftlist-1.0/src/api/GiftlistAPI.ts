import { AxiosError } from "axios";

import { axiosInstance as axios } from "@/main";
import store from "@/store";
import { SnackbarState } from "@/store/snackbar";
import { APIStatusCodeEnum } from "@/types/APIStatusCodeEnum";
import { SnackbarEventEnum } from "@/types/SnackbarEventEnum";
import { Auth0Client } from "@auth0/auth0-spa-js";

export default class GiftlistAPI {
	static token = "";

	static async getAuthToken(auth: Auth0Client) {
		const token = (await auth?.getTokenSilently()) || "";
		if (!GiftlistAPI.token) {
			GiftlistAPI.token = token;
		}
	}

	static showErrorSnackbar(error: Error) {
		const snackbar: SnackbarState = {
			message: (error as Error).message,
			type: SnackbarEventEnum.ERROR,
		};
		store.dispatch("showSnackbar", snackbar);
	}

	static async get(auth: Auth0Client, path: string, queryParams?: Record<string, unknown>) {
		await this.getAuthToken(auth);

		return axios.get(path, {
			headers: {
				Authorization: `Bearer ${GiftlistAPI.token}`,
			},
			params: queryParams,
		});
	}

	static async post(
		auth: Auth0Client,
		path: string,
		body?: Record<string, unknown>,
		queryParams?: Record<any, unknown>
	) {
		await this.getAuthToken(auth);

		return await axios.post(path, body, {
			headers: {
				Authorization: `Bearer ${GiftlistAPI.token}`,
			},
			params: queryParams,
		});
	}

	static async put(
		auth: Auth0Client,
		path: string,
		body?: Record<string, unknown>,
		queryParams?: Record<string, unknown>
	) {
		await this.getAuthToken(auth);

		return await axios.put(path, body, {
			headers: {
				Authorization: `Bearer ${GiftlistAPI.token}`,
			},
			params: queryParams,
		});
	}

	static async delete(auth: Auth0Client, path: string, queryParams?: Record<string, unknown>) {
		await this.getAuthToken(auth);
		return axios.delete(path, {
			headers: {
				Authorization: `Bearer ${GiftlistAPI.token}`,
			},
			params: queryParams,
		});
	}
}
