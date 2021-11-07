<template>
	<div class="flex flex-row items-center border border-black">
		<router-link to="/app">
			<span>Logo</span>
		</router-link>
		<ul class="flex flex-row">
			<li>
				<router-link to="/app">Dashboard</router-link>
			</li>
			<li>
				<router-link to="/app/lists">Mes listes</router-link>
			</li>
			<li>
				<router-link to="/app/lists/shared">Mes listes partagées</router-link>
			</li>
		</ul>
	</div>
	<div class="flex flex-row border border-black">
		<button>CTA</button>
		<router-link to="/app/profile">{{ fullName }}</router-link>
		<button v-on:click="logout">Déconnexion</button>
	</div>
</template>

<script lang="ts">
import { SnackbarState } from "@/store/snackbar";
import { SnackbarEventEnum } from "@/types/SnackbarEventEnum";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
	name: "LoggedInNavbar",
	setup() {
		const { getters, dispatch } = useStore();
		const router = useRouter();

		const logout = async () => {
			const snack: SnackbarState = {
				message: "",
				type: SnackbarEventEnum.ERROR,
			};

			dispatch("logout")
				.then(() => {
					console.debug("LoggedInNavbar - logout - Logout successful");
					console.debug("LoggedInNavbar - logout - Redirecting to homepage");
					router.push("/");

					snack.message = "Déconnection réussie";
					snack.type = SnackbarEventEnum.SUCCESS;
				})
				.catch((error: Error) => {
					console.error(error.message);
					snack.message = error.message;
				})
				.finally(() => {
					dispatch("showSnackbar", snack);
				});
		};

		return {
			fullName: computed(() => getters.fullName),
			logout,
		};
	},
});
</script>
