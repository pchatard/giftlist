<template>
	<DefaultLayout :title="labels.titles.profile" back>
		<div class="flex flex-col my-4">
			<div class="flex items-center justify-between border rounded-lg px-4 my-4">
				<img :src="auth.user.picture" alt="Profile Image" class="rounded-full m-4" />

				<div class="mx-4 w-1/4">
					<Subtitle>{{ auth.user.nickname }}</Subtitle>
					<div>Email : {{ auth.user.email }}</div>
					<button
						v-if="!auth.user.email_verified"
						class="text-indigo-600"
						@click="verifyEmail"
					>
						Vérifier mon email
					</button>
				</div>
				<div class="w-1/4">
					<div class="flex">
						<span
							v-for="(friend, i) in friends"
							:key="friend.id"
							class="
								w-12
								h-12
								bg-gray-300
								rounded-full
								grid
								place-items-center
								font-bold
								text-sm text-black
								border border-white
								shadow-sm
							"
							:class="i > 0 ? '-ml-2' : null"
							>{{ friend.name }}</span
						>
						<span
							class="
								w-12
								h-12
								bg-gray-300
								rounded-full
								grid
								place-items-center
								font-bold
								text-sm text-black
								border border-white
								shadow-sm
								-ml-2
							"
							>8+</span
						>
					</div>
					<div class="pl-1">12 amis</div>
					<router-link to="/app/profile/friends" class="ml-1 mt-4 text-indigo-600"
						>Gérer mes amis</router-link
					>
				</div>
				<div class="w-1/4">
					<div class="flex items-center justify-between mb-4">
						<div class="flex flex-col items-center">
							<span>
								<strong> 3 </strong>
							</span>
							<span class="text-center leading-tight">Listes créées</span>
						</div>
						<div class="flex flex-col items-center">
							<span>
								<strong> 12 </strong>
							</span>
							<span class="text-center leading-tight">Cadeaux créés</span>
						</div>
						<div class="flex flex-col items-center">
							<span>
								<strong> 5 </strong>
							</span>
							<span class="text-center leading-tight">Cadeaux offerts</span>
						</div>
					</div>
				</div>
			</div>

			<div class="flex items-stretch divide-x">
				<div class="flex-1 p-8">
					<div class="pb-5">
						<Subtitle>Modifier mon adresse email</Subtitle>
						<p class="mt-2 mb-4">
							Votre adresse email actuelle est <strong>{{ auth.user.email }}</strong
							>. Vous pouvez la modifier en cliquant sur le bouton ci-dessous qui vous
							redirigera vers la page de notre gestionnaire.
						</p>
						<Button btnStyle="secondary" class="w-1/2" @click="changeEmail"
							>Modifier mon email</Button
						>
					</div>
					<div class="pt-5">
						<Subtitle>Modifier mon mot de passe</Subtitle>
						<p class="mt-2 mb-4">
							Vous pouvez modifier votre mot de passe en cliquant sur le bouton ci-dessous.
							Vous serez redirigé vers une page de notre gestionnaire.
						</p>
						<Button btnStyle="secondary" class="w-1/2" @click="changePassword"
							>Modifier mon mot de passe</Button
						>
					</div>
				</div>
				<div class="flex-1 flex flex-col p-8">
					<Subtitle>Télécharger mes données</Subtitle>
					<p class="mt-2 mb-4">
						Dans le cadre de la législation RGPD blablabla, vous pouvez télécharger l'ensemble
						des données vous concernant dont Giftlist dispose.
					</p>
					<Button btnStyle="secondary" class="w-1/2" @click="downloadData"
						>Télécharger mes données</Button
					>
				</div>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

import labels from "@/labels/fr/labels.json";

import Button from "@/components/Styled/Button.vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Subtitle from "@/components/Styled/Subtitle.vue";

export default defineComponent({
	name: "Profile",
	components: { Button, DefaultLayout, Subtitle },
	setup() {
		const auth = ref(inject("Auth") as any);
		const friends = [
			{ id: 0, name: "ND" },
			{ id: 1, name: "ML" },
			{ id: 2, name: "PC" },
			{ id: 3, name: "ML" },
		];

		const verifyEmail = () => {
			console.log("Profile.vue - verifyEmail");
		};
		const changeEmail = () => {
			console.log("Profile.vue - changeEmail");
		};
		const changePassword = () => {
			console.log("Profile.vue - changePassword");
		};
		const downloadData = () => {
			console.log("Profile.vue - downloadData");
		};

		return {
			labels,
			auth,
			friends,
			verifyEmail,
			changeEmail,
			changePassword,
			downloadData,
		};
	},
});
</script>
