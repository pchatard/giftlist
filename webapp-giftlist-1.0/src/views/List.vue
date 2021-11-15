<template>
	<DefaultLayout title="Ma liste">
		<ol class="list-decimal list-inside">
			<li class="line-through">Créer une vue en grille</li>
			<li>Ajouter un lien direct vers son cadeau pour le propriétaire de la liste</li>
			<li class="line-through">Ajouter le prix</li>
			<li>Ajouter une preview imagée à partir d'un lien ?</li>
		</ol>
		<section>
			<Subtitle>Favoris</Subtitle>
			<div
				class="
					my-4
					grid grid-cols-1
					sm:grid-cols-2
					md:grid-cols-3
					grid-flow-row
					gap-x-4 gap-y-8
				"
			>
				<Gift v-for="i in 4" :key="i" :favorite="true" />
			</div>
		</section>
		<section>
			<Subtitle>Cadeaux</Subtitle>
			<div class="my-4 grid grid-cols-3 grid-flow-row gap-x-4 gap-y-8">
				<Gift v-for="i in 8" :key="i" :favorite="false" />
			</div>
		</section>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Gift from "@/components/Styled/Gift.vue";
import Subtitle from "@/components/Styled/Subtitle.vue";

export default defineComponent({
	name: "List",
	components: {
		DefaultLayout,
		Gift,
		Subtitle,
	},
});

export const listNavbarCta = (): void => {
	const listId = router.currentRoute.value.params.id;
	console.debug("List - listNavbarCta - CTA for list " + listId);
};
</script>
