import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/index.css";
import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
});

createApp(App).use(store).use(router).mount("#app");
