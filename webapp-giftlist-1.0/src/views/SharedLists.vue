<template>
	<default-layout title="Les listes de mes copains">
		<ul>
			<ListItem v-for="i in 3" :key="i">
				<div class="flex items-center justify-start">
					<ViewListIcon class="w-5 h-5 mr-5 text-yellow-400" />
					<router-link :to="'/app/shared/' + i"> Liste partagée {{ i }} </router-link>
				</div>
			</ListItem>
		</ul>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import ListItem from "@/components/Styled/ListItem.vue";
import { ViewListIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "SharedLists",
	components: {
		DefaultLayout,
		ListItem,
		ViewListIcon,
	},
});

export const sharedListsNavbarCta = (): void => {
	console.debug(
		"SharedLists - sharedListsNavbarCta - Redirecting or Opening popup to add a sharing code"
	);
	router.push("/app/shared/new");
};
</script>
