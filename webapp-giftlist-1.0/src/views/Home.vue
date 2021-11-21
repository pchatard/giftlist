<template>
	<DefaultLayout title="Home">
		<div>
			<Subtitle>Resources</Subtitle>
			<ul>
				<li>
					<a href="https://heroicons.com/" rel="noreferrer noopener" class="text-blue-500"
						>Heroicons</a
					>
				</li>
				<li>
					<a href="https://tailwindui.com/" rel="noreferrer noopener" class="text-blue-500"
						>TailwindUI</a
					>
				</li>
				<li>
					<a href="https://headlessui.dev/vue" rel="noreferrer noopener" class="text-blue-500"
						>HeadlessUI</a
					>
				</li>
			</ul>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Subtitle from "@/components/Styled/Subtitle.vue";

export default defineComponent({
	name: "Home",
	components: { DefaultLayout, Subtitle },
});
</script>
