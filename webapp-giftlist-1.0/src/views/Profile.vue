<template>
	<DefaultLayout title="Mon compte">
		{{ auth.user }}
		{{ test }}
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";

export default defineComponent({
	name: "Profile",
	components: { DefaultLayout },
	setup() {
		const auth = ref(inject("Auth") as any);

		const test = ref("");

		onMounted(async () => {
			test.value = await auth.value.getTokenSilently();
		});

		return {
			auth,
			test,
		};
	},
});
</script>
