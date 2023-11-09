import "./assets/main.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import { createAuth0 } from "@auth0/auth0-vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
    audience: import.meta.env.VITE_AUTH0_API_AUDIENCE,
    ui_locales: "fr",
  })
);

app.mount("#app");
