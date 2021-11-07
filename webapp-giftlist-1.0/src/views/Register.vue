<template>
	<div class="register">
		<h1>Inscription</h1>
		<button v-on:click="register">S'inscrire</button>
	</div>
</template>

<script lang="ts">
import { SnackbarState } from "@/store/snackbar";
import { SnackbarEventEnum } from "@/types/SnackbarEventEnum";
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
	name: "Register",
	setup() {
		const { state, getters, dispatch } = useStore();
		const router = useRouter();
		const route = useRoute();

		const register = async () => {
			const snack: SnackbarState = {
				message: "",
				type: SnackbarEventEnum.ERROR,
			};

			dispatch("register", {})
				.then(() => {
					const redirectRoute = route.query.redirect || "app";
					console.debug("Register - register - Success");
					console.debug("Register - register - Redirecting to /" + redirectRoute);
					router.push(`/${redirectRoute}`);

					snack.message = "Connecté en tant que " + getters.fullName;
					snack.type = SnackbarEventEnum.SUCCESS;
				})
				.catch((error: Error) => {
					console.error("Register - register - " + error.message);
					snack.message = error.message;
				})
				.finally(() => {
					dispatch("showSnackbar", snack);
				});
		};

		onMounted(() => {
			if (state.auth.loggedIn) {
				console.debug("Register - onMounted - Already loggedIn, redirecting");
				router.push("/app");
			}
		});

		return {
			register,
		};
	},
});
</script>
