<template>
	<default-layout title="Les listes de mes copains">
		<ul>
			<li v-for="i in 3" :key="i">
				<router-link :to="'/app/shared/' + i"> Liste partagée {{ i }} </router-link>
			</li>
		</ul>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";

export default defineComponent({
	name: "SharedLists",
	components: {
		DefaultLayout,
	},
});

export const sharedListsNavbarCta = (): void => {
	console.debug(
		"SharedLists - sharedListsNavbarCta - Redirecting or Opening popup to add a sharing code"
	);
	router.push("/app/shared/new");
};
</script>
