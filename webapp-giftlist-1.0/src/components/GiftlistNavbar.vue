<template>
	<nav id="nav" class="h-full w-full px-6 flex flex-row justify-between items-center bg-white">
		<GiftlistNavbarLoggedIn v-if="isAuthenticated" />
		<GiftlistNavbarLoggedOut v-else />
	</nav>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";

import { Auth0Client } from "@auth0/auth0-spa-js";

import GiftlistNavbarLoggedIn from "@/components/GiftlistNavbarLoggedIn.vue";
import GiftlistNavbarLoggedOut from "@/components/GiftlistNavbarLoggedOut.vue";

const auth = ref(inject("Auth") as Auth0Client);

const isAuthenticated = auth.value.isAuthenticated;
</script>
