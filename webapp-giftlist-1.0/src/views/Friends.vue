<template>
	<DefaultLayout :title="labels.titles.friends" back>
		<div class="flex items-stretch border rounded-lg size">
			<div class="w-1/3 flex flex-col">
				<Subtitle class="px-4 py-2">Mes amis</Subtitle>
				<ul class="overflow-scroll">
					<li
						v-for="i in 2"
						:key="i"
						class="py-4 px-8 flex justify-between items-center hover:bg-gray-100"
					>
						<span class="flex items-center cursor-pointer">
							<span class="w-12 h-12 rounded-full bg-gray-200 grid place-items-center">
								ML
							</span>
							<span class="ml-4">Marc Lavoine</span>
						</span>
						<span class="flex justify-between items-center">
							<CheckCircleIcon
								class="w-6 mx-1 cursor-pointer text-green-600"
								@click="acceptFriendRequest"
							/>
							<XCircleIcon
								class="w-6 mx-1 cursor-pointer text-red-600"
								@click="declineFriendRequest"
							/>
						</span>
					</li>
					<li
						v-for="i in 7"
						:key="i"
						class="py-4 px-8 flex justify-between items-center hover:bg-gray-100"
					>
						<span class="flex items-center cursor-pointer">
							<span class="w-12 h-12 rounded-full bg-gray-200 grid place-items-center">
								ML
							</span>
							<span class="ml-4">Marc Lavoine</span>
						</span>
						<XCircleIcon
							class="w-6 text-gray-600 cursor-pointer hover:text-red-600"
							@click="deleteFriend"
						/>
					</li>
					<li
						v-for="i in 2"
						:key="i"
						class="py-4 px-8 flex justify-between items-center hover:bg-gray-100"
					>
						<span class="flex items-center cursor-pointer">
							<span class="w-12 h-12 rounded-full bg-gray-200 grid place-items-center">
								ML
							</span>
							<span class="ml-4">Marc Lavoine</span>
						</span>
						<span class="text-sm text-gray-400">En attente de validation</span>
					</li>
				</ul>
			</div>
			<div class="w-2/3 px-4 py-2 flex flex-col divide-y">
				<div class="h-3/5 flex flex-col justify-center pb-4">
					<Subtitle class="pb-2">Ajouter un ami</Subtitle>
					<p>Ajoutez vos amis en entrant leur adresse e-mail :</p>
					<div class="flex items-center my-2">
						<FormInputText
							class="w-2/5"
							type="email"
							:label="emailInput.label"
							:value="emailInput.value"
							:helperText="emailInput.helperText"
							:placeholder="emailInput.placeholder"
							:errorMessage="emailInput.errorMessage"
							:isError="emailInput.errorMessage !== ''"
							@change="handleEmailInputChange"
							reset
						/>
						<Button class="ml-4 w-2/5" @click="sendFriendRequest"
							>Envoyer une invitation</Button
						>
					</div>
					<p>
						En ajoutant des amis, vous pourrez partager directement vos listes avec eux, sans
						avoir à partager de lien.
					</p>
				</div>
				<div class="h-2/5 flex flex-col justify-center py-4">
					<Subtitle class="pb-2">Invitez vos amis sur Giftlist</Subtitle>
					<!-- <p>Invitez vos amis sur Giftlist :</p> -->
					<div class="flex items-center mt-2">
						<FormInputText
							class="w-2/5"
							type="email"
							:label="emailInvitationInput.label"
							:value="emailInvitationInput.value"
							:helperText="emailInvitationInput.helperText"
							:placeholder="emailInvitationInput.placeholder"
							:errorMessage="emailInvitationInput.errorMessage"
							:isError="emailInvitationInput.errorMessage !== ''"
							@change="handleEmailInvitationInputChange"
							reset
						/>
						<Button class="ml-4 w-2/5" @click="sendInvitationRequest"
							>Inviter sur Giftlist</Button
						>
					</div>
					<p>
						Invitez vos amis sur Giftlist pour qu'ils puissent créer leurs listes et partager
						leurs envies à leur tour !
					</p>
				</div>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import labels from "@/labels/fr/labels.json";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import Button from "@/components/Styled/Button.vue";
import Subtitle from "@/components/Styled/Subtitle.vue";
import FormInputText from "@/components/Inputs/FormInputText.vue";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "Friends",
	components: { Button, DefaultLayout, FormInputText, Subtitle, CheckCircleIcon, XCircleIcon },
	setup() {
		const acceptFriendRequest = () => {
			console.log("Friends.vue - acceptFriendRequest");
		};

		const declineFriendRequest = () => {
			console.log("Friends.vue - declineFriendRequest");
		};

		const deleteFriend = () => {
			console.log("Friends.vue - deleteFriend");
		};

		const emailInput = ref({
			label: "E-mail de votre ami",
			placeholder: "bonjour@giftlist.com",
			value: "",
			errorMessage: "",
			helperText: "Ajouter vos amis via leur adresse mail",
		});

		const handleEmailInputChange = (value: string) => {
			emailInput.value.value = value;
		};

		const sendFriendRequest = () => {
			console.log("Friends.vue - sendFriendRequest");
		};

		const emailInvitationInput = ref({
			label: "E-mail de votre ami",
			placeholder: "bonjour@giftlist.com",
			value: "",
			errorMessage: "",
			helperText: "Invitez vos amis sur Giftlist via leur adresse mail",
		});

		const handleEmailInvitationInputChange = (value: string) => {
			emailInvitationInput.value.value = value;
		};

		const sendInvitationRequest = () => {
			console.log("Friends.vue - sendInvitationRequest");
		};

		return {
			labels,
			acceptFriendRequest,
			declineFriendRequest,
			deleteFriend,
			emailInput,
			handleEmailInputChange,
			sendFriendRequest,
			emailInvitationInput,
			handleEmailInvitationInputChange,
			sendInvitationRequest,
		};
	},
});
</script>

<style lang="scss" scoped>
.size {
	max-height: 75vh;
	overflow: hidden;
}
</style>
