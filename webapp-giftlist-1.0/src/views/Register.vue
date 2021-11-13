<template>
	<DefaultLayout title="Inscription">
		<div class="absolute inset-0 w-full h-full flex items-center justify-center">
			<button v-on:click="register" class="giftlist-cta">S'inscrire</button>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import { SnackbarState } from "@/store/snackbar";
import { SnackbarEventEnum } from "@/types/SnackbarEventEnum";
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
	name: "Register",
	components: { DefaultLayout },
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
