<template>
	<div class="login">
		<h1>Connexion</h1>
		<button v-on:click="login">Se connecter</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
	name: "Login",
	setup() {
		const { state, dispatch } = useStore();
		const router = useRouter();
		const route = useRoute();

		onMounted(() => {
			if (state.auth.loggedIn) {
				console.debug("Login - onMounted - Already loggedIn, redirecting");
				router.push("/app");
			}
		});

		const redirectRoute = route.query.redirect || "app";

		const login = async () => {
			dispatch("login", {})
				.then(() => {
					console.debug("Login - login - Success");
					console.debug("Login - login - Redirecting to /" + redirectRoute);
					router.push(`/${redirectRoute}`);
				})
				.catch((error: Error) => {
					console.error("Login - login - " + error.message);
				});
		};

		return {
			login,
		};
	},
});
</script>
