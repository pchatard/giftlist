<template>
	<div class="list">
		<Title>Ma liste</Title>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import Title from "@/components/Styled/Title.vue";

export default defineComponent({
	name: "List",
	components: {
		Title,
	},
});

export const listNavbarCta = () => {
	const listId = router.currentRoute.value.params.id;
	console.debug("List - listNavbarCta - CTA for list " + listId);
};
</script>
