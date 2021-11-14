<template>
	<DefaultLayout title="Mes listes">
		<ul>
			<ListItem v-for="i in 10" :key="i">
				<div class="flex items-center justify-start">
					<ViewListIcon class="w-5 h-5 mr-5 text-yellow-400" />
					<router-link :to="'/app/lists/' + i"> Liste {{ i }}</router-link>
				</div>
			</ListItem>
		</ul>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import ListItem from "@/components/Styled/ListItem.vue";
import { ViewListIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "Lists",
	components: {
		DefaultLayout,
		ListItem,
		ViewListIcon,
	},
});

export const listsNavbarCta = (): void => {
	console.debug("Lists - listsNavbarCta - Redirecting to new list page");
	router.push("/app/lists/new");
};
</script>
