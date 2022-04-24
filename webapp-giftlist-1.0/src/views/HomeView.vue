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
				<li>
					<a
						href="https://auth0.com/docs/api/management/v2#!/Users/get_users"
						rel="noreferrer noopener"
						class="text-blue-500"
						>Auth0 Management API Docs</a
					>
				</li>
				<li>
					<a
						href="https://auth0.com/docs/security/tokens/access-tokens/get-management-api-access-tokens-for-production"
						rel="noreferrer noopener"
						class="text-blue-500"
						>Auth0 Management API Get Token</a
					>
				</li>
			</ul>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import DefaultLayout from "@/components/DefaultLayout.vue";
import Subtitle from "@/components/Subtitle.vue";

export default defineComponent({
	name: "HomeView",
	components: { DefaultLayout, Subtitle },
});
</script>
