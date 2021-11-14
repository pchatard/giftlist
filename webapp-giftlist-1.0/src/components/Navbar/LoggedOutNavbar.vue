<template>
	<div class="w-full flex flex-row items-center justify-between">
		<router-link to="/">
			<span class="bg-yellow-400 rounded-md py-2 px-6 mr-4 font-bold italic text-lg"
				>GIFTLIST</span
			>
		</router-link>
		<ul class="flex flex-row items-center justify-between">
			<router-link to="/login">
				<Button class="mx-1" btnStyle="secondary">Connexion</Button>
			</router-link>
			<router-link to="/register">
				<Button class="mx-1">Inscription</Button>
			</router-link>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Button from "@/components/Styled/Button.vue";

export default defineComponent({
	name: "LoggedOutNavbar",
	components: {
		Button,
	},
});
</script>
