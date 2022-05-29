<template>
	<div class="w-full flex flex-row items-center justify-between">
		<router-link to="/">
			<span class="bg-logoLight text-logo rounded-lg font-test w-auto px-6 mr-4 text-3xl"
				>giftlist</span
			>
		</router-link>
		<ul class="flex flex-row items-center justify-between">
			<GiftlistButton
				v-if="!auth.loading && !auth.isAuthenticated"
				:btn-style="ButtonStyleEnum.primary"
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

import { ButtonStyleEnum } from "@/types/enums/ButtonStyleEnum";
import GiftlistButton from "@/components/GiftlistButton.vue";

const auth = ref(inject("Auth") as Auth0Client);

const login = async () => {
	await auth.value.loginWithRedirect({
		redirect_uri: window.location.origin + "/app/lists",
	});
};
</script>
