<template>
	<DefaultLayout title="Inscription">
		<div class="absolute inset-0 w-full h-full flex items-center justify-center">
			<Button @click="register">S'inscrire</Button>
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
	name: "Register",
	components: { Button, DefaultLayout },
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
