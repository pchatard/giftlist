<template>
	<div class="w-full flex flex-row items-center justify-between">
		<router-link to="/">
			<span class="bg-yellow-400 rounded-md py-2 px-6 mr-4 font-bold italic text-lg"
				>GIFTLIST</span
			>
		</router-link>
		<ul class="flex flex-row items-center">
			<NavbarItem path="/login" text="Connexion" />
			<NavbarItem path="/register" text="Inscription" :isCTA="true" />
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavbarItem from "@/components/Styled/NavbarItem.vue";

export default defineComponent({
	name: "LoggedOutNavbar",
	components: {
		NavbarItem,
	},
});
</script>
