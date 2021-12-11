<template>
	<div>
		<Subtitle>Informations de la liste</Subtitle>
		<button @click="$emit('confirm')">Continuer vers ma liste</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Subtitle from "@/components/Styled/Subtitle.vue";

export default defineComponent({
	name: "NewListStep1",
	components: {
		Subtitle,
	},
	emits: ["confirm"],
});
</script>
