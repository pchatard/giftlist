import { AxiosError } from "axios";

import { axiosInstance as axios } from "@/main";
import router from "@/router";
import store from "@/store";
import { SnackbarState } from "@/store/snackbar";
import { APIStatusCodeEnum } from "@/types/enums/APIStatusCodeEnum";
import { SnackbarEventEnum } from "@/types/enums/SnackbarEventEnum";
import { Auth0Client } from "@auth0/auth0-spa-js";

const UNAUTHORIZED_ERROR_MSG = "Vous n'êtes pas autorisé à effectuer cette action.";

export default class GiftlistAPI {
	static token = "";

	static async getAuthToken(auth: Auth0Client) {
		const token = (await auth?.getTokenSilently()) || "";
		if (!GiftlistAPI.token) {
			GiftlistAPI.token = token;
		}
	}

	static showErrorSnackbar(errorMessage: string) {
		const snackbar: SnackbarState = {
			message: errorMessage,
			type: SnackbarEventEnum.ERROR,
		};
		store.dispatch("showSnackbar", snackbar);
	}

	static checkUnauthorizedError(error: AxiosError, redirect = false) {
		if (error.response?.status === APIStatusCodeEnum.UNAUTHORIZED) {
			if (redirect) {
				router.push("/app/error");
			} else {
				this.showErrorSnackbar(UNAUTHORIZED_ERROR_MSG);
			}
		} else {
			throw error;
		}
	}

	static async get(
		auth: Auth0Client,
		path: string,
		queryParams?: Record<string, unknown>,
		redirectError = false
	) {
		await this.getAuthToken(auth);

		try {
			return axios.get(path, {
				headers: {
					Authorization: `Bearer ${GiftlistAPI.token}`,
				},
				params: queryParams,
			});
		} catch (error) {
			this.checkUnauthorizedError(error as AxiosError, redirectError);
		}
	}

	static async post(
		auth: Auth0Client,
		path: string,
		body?: Record<string, unknown>,
		queryParams?: Record<string, unknown>,
		redirectError = false
	) {
		await this.getAuthToken(auth);

		try {
			return await axios.post(path, body, {
				headers: {
					Authorization: `Bearer ${GiftlistAPI.token}`,
				},
				params: queryParams,
			});
		} catch (error) {
			this.checkUnauthorizedError(error as AxiosError, redirectError);
		}
	}

	static async put(
		auth: Auth0Client,
		path: string,
		body?: Record<string, unknown>,
		queryParams?: Record<string, unknown>,
		redirectError = false
	) {
		await this.getAuthToken(auth);
		try {
			return await axios.put(path, body, {
				headers: {
					Authorization: `Bearer ${GiftlistAPI.token}`,
				},
				params: queryParams,
			});
		} catch (error) {
			this.checkUnauthorizedError(error as AxiosError, redirectError);
		}
	}

	static async delete(
		auth: Auth0Client,
		path: string,
		queryParams?: Record<string, unknown>,
		redirectError = false
	) {
		await this.getAuthToken(auth);
		try {
			return axios.delete(path, {
				headers: {
					Authorization: `Bearer ${GiftlistAPI.token}`,
				},
				params: queryParams,
			});
		} catch (error) {
			this.checkUnauthorizedError(error as AxiosError, redirectError);
		}
	}
}
