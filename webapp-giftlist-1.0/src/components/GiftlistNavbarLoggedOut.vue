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
				class="mx-1"
				btn-style="secondary"
				@click="login"
			>
				{{ labels.navbar.links.login }}
			</GiftlistButton>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";

import { Auth0Client } from "@auth0/auth0-spa-js";

import labels from "@/labels/fr/labels.json";

import GiftlistButton from "@/components/GiftlistButton.vue";

const auth = ref(inject("Auth") as Auth0Client);

const login = async () => {
	await auth.value.loginWithRedirect({
		redirect_uri: window.location.origin + "/app/lists",
	});
};
</script>
