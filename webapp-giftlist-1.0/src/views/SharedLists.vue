<template>
	<div class="shared-lists">
		<Title>Les listes de mes copains</Title>
		<ul>
			<li v-for="i in 3" :key="i">
				<router-link :to="'/app/shared/' + i"> Liste partagée {{ i }} </router-link>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import Title from "@/components/Styled/Title.vue";

export default defineComponent({
	name: "SharedLists",
	components: {
		Title,
	},
});

export const sharedListsNavbarCta = () => {
	console.debug(
		"SharedLists - sharedListsNavbarCta - Redirecting or Opening popup to add a sharing code"
	);
	router.push("/app/shared/new");
};
</script>
