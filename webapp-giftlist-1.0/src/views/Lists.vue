<template>
	<div class="lists">
		<Title>Mes listes</Title>
		<ul>
			<li v-for="i in 10" :key="i">
				<router-link :to="'/app/lists/' + i"> Liste {{ i }}</router-link>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import Title from "@/components/Styled/Title.vue";

export default defineComponent({
	name: "Lists",
	components: {
		Title,
	},
});

export const listsNavbarCta = () => {
	console.debug("Lists - listsNavbarCta - Redirecting to new list page");
	router.push("/app/lists/new");
};
</script>
