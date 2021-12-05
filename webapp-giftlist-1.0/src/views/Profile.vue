<template>
	<DefaultLayout title="Mon compte">
		<div>
			<Subtitle>Informations personnelles</Subtitle>
			<img :src="auth.user.picture" alt="Profile Icon" class="rounded-full" />
			<p><strong>Nom</strong> : {{ auth.user.nickname }}</p>
			<p><strong>Email</strong> : {{ auth.user.email }}</p>
			<p><strong>Metadata</strong>: {{ user }}</p>
		</div>
		{{ testMgmtToken }}
		<button @click="testFunction">Call Mgmt API</button>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Subtitle from "@/components/Styled/Subtitle.vue";

export default defineComponent({
	name: "Profile",
	components: { DefaultLayout, Subtitle },
	setup() {
		const auth = ref(inject("Auth") as any);
		const user = ref();

		const testToken = ref("");
		let testMgmtToken = ref();

		const token = process.env.VUE_APP_AUTH0_MANAGEMENT_API_TOKEN;

		onMounted(async () => {
			testToken.value = await auth.value.getTokenSilently();
			fetch(
				"https://giftlist-app.eu.auth0.com/api/v2/users/" +
					auth.value.user.sub +
					"?fields=user_metadata",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					user.value = data;
				});
		});

		const testFunction = async () => {
			const newMetadata = {
				user_metadata: {
					test: "testModif",
				},
			};
			// console.log(auth.value.user.user_id);
			fetch("https://giftlist-app.eu.auth0.com/api/v2/users/" + auth.value.user.sub, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify(newMetadata),
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					testMgmtToken.value = data;
				});
		};

		return {
			auth,
			testToken,
			testMgmtToken,
			testFunction,
			user,
		};
	},
});
</script>
