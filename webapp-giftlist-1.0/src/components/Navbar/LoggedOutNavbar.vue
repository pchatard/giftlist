<template>
	<div class="w-full flex flex-row items-center justify-between">
		<router-link to="/">
			<span class="bg-yellow-400 rounded-md py-2 px-6 mr-4 font-bold italic text-lg"
				>GIFTLIST</span
			>
		</router-link>
		<ul class="flex flex-row items-center justify-between">
			<Button
				v-if="!auth.loading && !auth.isAuthenticated"
				@click="login"
				class="mx-1"
				btnStyle="secondary"
			>
				Connexion
			</Button>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

import Button from "@/components/Styled/Button.vue";

export default defineComponent({
	name: "LoggedOutNavbar",
	components: {
		Button,
	},
	setup() {
		const auth = ref(inject("Auth") as any);
		const login = () => {
			auth.value.loginWithRedirect();
		};

		return {
			auth,
			login,
		};
	},
});
</script>
