import "./registerServiceWorker";
import "./assets/index.css";

import axios from "axios";
import { createApp } from "vue";

import App from "./App.vue";
import Auth0 from "./auth";
import router from "./router";
import store from "./store";

export const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
});

async function init() {
	const AuthPlugin = await Auth0.init({
		onRedirectCallback: (appState: any) => {
			localStorage.setItem("giftlist-redirect", appState.targetUrl);
		},
		clientId: process.env.VUE_APP_AUTH0_CLIENT_ID || "",
		domain: process.env.VUE_APP_AUTH0_DOMAIN || "",
		audience: process.env.VUE_APP_AUTH0_AUDIENCE || "",
		redirectUri: window.location.origin + "/app/redirect",
	});

	createApp(App).use(AuthPlugin).use(store).use(router).mount("#app");
}

init();
