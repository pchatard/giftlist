<template>
	<div class="register">
		<h1>Inscription</h1>
		<button v-on:click="register">S'inscrire</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
	name: "Register",
	setup() {
		const { state, dispatch } = useStore();
		const router = useRouter();
		const route = useRoute();

		onMounted(() => {
			if (state.auth.loggedIn) {
				console.debug("Register - onMounted - Already loggedIn, redirecting");
				router.push("/app");
			}
		});

		const redirectRoute = route.query.redirect || "app";

		const register = async () => {
			dispatch("register", {})
				.then(() => {
					console.debug("Register - register - Success");
					console.debug("Register - register - Redirecting to /" + redirectRoute);
					router.push(`/${redirectRoute}`);
				})
				.catch((error: Error) => {
					console.error("Register - register - " + error.message);
				});
		};

		return {
			register,
		};
	},
});
</script>
