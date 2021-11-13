<template>
	<DefaultLayout title="Ma liste"> </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";

export default defineComponent({
	name: "List",
	components: {
		DefaultLayout,
	},
});

export const listNavbarCta = (): void => {
	const listId = router.currentRoute.value.params.id;
	console.debug("List - listNavbarCta - CTA for list " + listId);
};
</script>
