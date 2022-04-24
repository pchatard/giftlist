<template>
	<DefaultLayout :title="labels.titles.profile" back>
		<div class="flex flex-col my-4">
			<div class="flex items-center justify-between border rounded-lg px-4 my-4">
				<div
					class="bg-indigo-600 text-white text-4xl font-semibold w-1/12 my-4 grid place-items-center rounded-full"
					style="aspect-ratio: 1"
				>
					{{ user.displayName.toUpperCase()[0] }}
				</div>

				<div class="w-1/4">
					<Subtitle>{{ user.displayName }}</Subtitle>
					<div>{{ labels.profile.email }} {{ user.email }}</div>
					<button
						v-if="!auth.user.email_verified"
						class="text-indigo-600"
						@click="verifyEmail"
					>
						{{ labels.profile.verifyEmail }}
					</button>
				</div>
				<div class="w-1/4">
					<div class="flex">
						<span
							v-for="(friend, i) in friends"
							:key="friend.id"
							class="w-12 h-12 bg-gray-300 rounded-full grid place-items-center font-bold text-sm text-black border border-white shadow-sm"
							:class="i > 0 ? '-ml-2' : null"
							>{{ friend.name }}</span
						>
						<span
							class="w-12 h-12 bg-gray-300 rounded-full grid place-items-center font-bold text-sm text-black border border-white shadow-sm -ml-2"
							>8+</span
						>
					</div>
					<div class="pl-1">12 {{ labels.profile.friendsNumber }}</div>
					<router-link to="/app/profile/friends" class="ml-1 mt-4 text-indigo-600">
						{{ labels.profile.manageFriends }}
					</router-link>
				</div>
				<div class="w-1/4">
					<div class="flex items-center justify-between mb-4">
						<div class="flex flex-col items-center">
							<span>
								<strong> 3 </strong>
							</span>
							<span class="text-center leading-tight">
								{{ labels.profile.createdLists }}
							</span>
						</div>
						<div class="flex flex-col items-center">
							<span>
								<strong> 12 </strong>
							</span>
							<span class="text-center leading-tight">
								{{ labels.profile.createdGifts }}
							</span>
						</div>
						<div class="flex flex-col items-center">
							<span>
								<strong> 5 </strong>
							</span>
							<span class="text-center leading-tight">
								{{ labels.profile.bookedGifts }}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div class="flex items-stretch divide-x">
				<div class="flex-1 p-8">
					<div class="pb-5">
						<Subtitle>{{ labels.profile.editEmailTitle }}</Subtitle>
						<div class="mt-2 mb-4">
							<p>
								{{ labels.profile.editEmailCurrent }} <strong>{{ user.email }}</strong>
							</p>
							<p>
								{{ labels.profile.editEmailText }}
							</p>
						</div>
						<Button btn-style="secondary" class="w-1/2" @click="changeEmail">
							{{ labels.profile.editEmailButton }}
						</Button>
					</div>
					<div class="pt-5">
						<Subtitle>{{ labels.profile.editPasswordTitle }}</Subtitle>
						<p class="mt-2 mb-4">
							{{ labels.profile.editPasswordText }}
						</p>
						<Button btn-style="secondary" class="w-1/2" @click="changePassword">
							{{ labels.profile.editPasswordButton }}
						</Button>
					</div>
				</div>
				<div class="flex-1 flex flex-col p-8">
					<div class="pb-5">
						<Subtitle>{{ labels.profile.dataTitle }}</Subtitle>
						<p class="mt-2 mb-4">
							{{ labels.profile.dataText }}
						</p>
						<Button btn-style="secondary" class="w-1/2" @click="downloadData">
							{{ labels.profile.dataButton }}
						</Button>
					</div>
					<div class="pt-5">
						<Subtitle>{{ labels.profile.deleteTitle }}</Subtitle>
						<p class="mt-2 mb-4">
							{{ labels.profile.deleteText }}
						</p>
						<Button btn-style="danger" class="w-1/2" @click="deleteAccount">
							{{ labels.profile.deleteButton }}
						</Button>
					</div>
				</div>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, Ref } from "vue";
import { useStore } from "vuex";

import Button from "@/components/Button/Button.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import Subtitle from "@/components/Subtitle.vue";
import labels from "@/labels/fr/labels.json";
import { UserDTO } from "@/types/dto/UserDTO";

export default defineComponent({
	name: "ProfileView",
	components: { Button, DefaultLayout, Subtitle },
	setup() {
		onMounted(async () => {
			await dispatch("getUser", auth);
		});

		const { state, dispatch } = useStore();
		const user: Ref<UserDTO> = computed(() => state.user);
		const auth = inject("Auth") as any;

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

		const deleteAccount = async () => {
			console.log("Profile.vue - deleteAccount");
			const deleteResult = await dispatch("deleteAccount", auth);
			if (deleteResult) {
				auth.logout({
					returnTo: window.location.origin,
				});
			}
		};

		return {
			labels,
			auth,
			user,
			friends,
			verifyEmail,
			changeEmail,
			changePassword,
			downloadData,
			deleteAccount,
		};
	},
});
</script>
