<template>
	<DefaultLayout :title="labels.titles.friends" back>
		<div class="flex items-stretch border rounded-lg size">
			<div class="w-1/3 flex flex-col">
				<!-- <Subtitle class="px-4 py-2">Mes amis</Subtitle> -->
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
					<GiftlistSubtitle class="pb-2">{{
						labels.friends.addFriendsTitle
					}}</GiftlistSubtitle>
					<p>{{ labels.friends.addFriendsText }}</p>
					<div class="flex items-center my-2">
						<InputText
							class="w-2/5"
							type="email"
							:label="emailInput.label"
							:value="emailInput.value"
							:helper-text="emailInput.helperText"
							:placeholder="emailInput.placeholder"
							:error-message="emailInput.errorMessage"
							:is-error="emailInput.errorMessage !== ''"
							reset
							@change="handleEmailInputChange"
						/>
						<GiftlistButton class="ml-4 w-2/5" @click="sendFriendRequest">{{
							labels.friends.addFriendsButton
						}}</GiftlistButton>
					</div>
					<p>
						{{ labels.friends.addFriendsDescription }}
					</p>
				</div>
				<div class="h-2/5 flex flex-col justify-center py-4">
					<GiftlistSubtitle class="pb-2">{{ labels.friends.inviteTitle }}</GiftlistSubtitle>
					<div class="flex items-center mt-2">
						<InputText
							class="w-2/5"
							type="email"
							:label="emailInvitationInput.label"
							:value="emailInvitationInput.value"
							:helper-text="emailInvitationInput.helperText"
							:placeholder="emailInvitationInput.placeholder"
							:error-message="emailInvitationInput.errorMessage"
							:is-error="emailInvitationInput.errorMessage !== ''"
							reset
							@change="handleEmailInvitationInputChange"
						/>
						<GiftlistButton class="ml-4 w-2/5" @click="sendInvitationRequest">
							{{ labels.friends.inviteButton }}
						</GiftlistButton>
					</div>
					<p>
						{{ labels.friends.inviteButton }}
					</p>
				</div>
			</div>
		</div>
	</DefaultLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";

import labels from "@/labels/fr/labels.json";

import DefaultLayout from "@/components/DefaultLayout.vue";
import GiftlistButton from "@/components/GiftlistButton.vue";
import GiftlistSubtitle from "@/components/GiftlistSubtitle.vue";
import InputText from "@/components/InputText.vue";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/outline";

const acceptFriendRequest = () => {
	alert("Friends.vue - acceptFriendRequest");
};

const declineFriendRequest = () => {
	alert("Friends.vue - declineFriendRequest");
};

const deleteFriend = () => {
	alert("Friends.vue - deleteFriend");
};

const emailInput = ref({
	label: labels.friends.addFriendsInput.label,
	placeholder: labels.friends.addFriendsInput.placeholder,
	value: "",
	errorMessage: "",
	helperText: labels.friends.addFriendsInput.helperText,
});

const handleEmailInputChange = (value: string) => {
	emailInput.value.value = value;
};

const sendFriendRequest = () => {
	alert("Friends.vue - sendFriendRequest");
};

const emailInvitationInput = ref({
	label: labels.friends.inviteInput.label,
	placeholder: labels.friends.inviteInput.placeholder,
	value: "",
	errorMessage: "",
	helperText: labels.friends.inviteInput.helperText,
});

const handleEmailInvitationInputChange = (value: string) => {
	emailInvitationInput.value.value = value;
};

const sendInvitationRequest = () => {
	alert("Friends.vue - sendInvitationRequest");
};
</script>

<style lang="scss" scoped>
.size {
	max-height: 75vh;
	overflow: hidden;
}
</style>
