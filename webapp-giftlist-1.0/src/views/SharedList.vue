<template>
	<DefaultLayout title="La liste de mon copain">
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
				<Gift v-for="i in 4" :key="i" :favorite="true" :shared="true" />
			</div>
		</section>
		<section>
			<Subtitle>Cadeaux</Subtitle>
			<div class="my-4 grid grid-cols-3 grid-flow-row gap-x-4 gap-y-8">
				<Gift v-for="i in 8" :key="i" :favorite="false" :shared="true" />
			</div>
		</section>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Gift from "@/components/Styled/Gift.vue";
import Subtitle from "@/components/Styled/Subtitle.vue";

export default defineComponent({
	name: "SharedList",
	components: {
		DefaultLayout,
		Gift,
		Subtitle,
	},
});
</script>
