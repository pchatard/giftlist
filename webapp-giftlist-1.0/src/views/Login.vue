<template>
	<DefaultLayout title="Connexion">
		<div class="absolute inset-0 w-full h-full flex items-center justify-center">
			<Button @click="login"> Se connecter </Button>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { SnackbarState } from "@/store/snackbar";
import { SnackbarEventEnum } from "@/types/SnackbarEventEnum";
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import Button from "@/components/Styled/Button.vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";

export default defineComponent({
	name: "Login",
	components: { Button, DefaultLayout },
	setup() {
		const { state, getters, dispatch } = useStore();
		const router = useRouter();
		const route = useRoute();

		const login = async () => {
			const snack: SnackbarState = {
				message: "",
				type: SnackbarEventEnum.ERROR,
			};

			dispatch("login", {})
				.then(() => {
					const redirectRoute = route.query.redirect || "app/lists";
					console.debug("Login - login - Success");
					console.debug("Login - login - Redirecting to /" + redirectRoute);
					router.push(`/${redirectRoute}`);
					snack.message = "Connecté en tant que " + getters.fullName;
					snack.type = SnackbarEventEnum.SUCCESS;
				})
				.catch((error: Error) => {
					console.error("Login - login - " + error.message);
					snack.message = error.message;
				})
				.finally(() => {
					dispatch("showSnackbar", snack);
				});
		};

		onMounted(() => {
			if (state.auth.loggedIn) {
				console.debug("Login - onMounted - Already loggedIn, redirecting");
				router.push("/app");
			}
		});

		return {
			login,
		};
	},
});
</script>
