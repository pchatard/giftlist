<template>
	<div class="w-full flex flex-row items-center justify-between">
		<router-link to="/">
			<span class="bg-yellow-400 rounded-md py-2 px-6 mr-4 font-bold italic text-lg"
				>GIFTLIST</span
			>
		</router-link>
		<ul class="flex flex-row items-center justify-between">
			<GiftlistButton
				v-if="!auth.loading && !auth.isAuthenticated"
				@click="login"
				class="mx-1"
				btn-style="secondary"
			>
				{{ labels.navbar.links.login }}
			</GiftlistButton>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

import GiftlistButton from "@/components/GiftlistButton.vue";
import labels from "@/labels/fr/labels.json";

export default defineComponent({
	name: "GiftlistNavbarLoggedOut",
	components: {
		GiftlistButton,
	},
	setup() {
		const auth = ref(inject("Auth") as any);
		const login = async () => {
			await auth.value.loginWithRedirect({
				redirect_uri: window.location.origin + "/app/lists",
			});
		};

		return {
			labels,
			auth,
			login,
		};
	},
});
</script>
