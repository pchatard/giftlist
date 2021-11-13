<template>
	<DefaultLayout title="Mes listes">
		<ul>
			<li v-for="i in 10" :key="i">
				<router-link :to="'/app/lists/' + i"> Liste {{ i }}</router-link>
			</li>
		</ul>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";

export default defineComponent({
	name: "Lists",
	components: {
		DefaultLayout,
	},
});

export const listsNavbarCta = (): void => {
	console.debug("Lists - listsNavbarCta - Redirecting to new list page");
	router.push("/app/lists/new");
};
</script>
