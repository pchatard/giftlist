<template>
	<DefaultLayout :title="labels.titles.settings" back>
		<section class="my-4">
			<Subtitle>Affichage</Subtitle>
			<div>
				<h3 class="font-medium text-xl">Mode d'affichage des cadeaux</h3>
				<RadioGroup v-model="selectedDisplayList">
					<RadioGroupLabel class="sr-only">Mode d'affichage des cadeaux</RadioGroupLabel>
					<div class="flex flex-row space-x-4 my-4">
						<RadioGroupOption
							as="template"
							v-for="opt in displayListOptions"
							:key="opt.title"
							:value="opt"
							v-slot="{ checked }"
						>
							<div
								:class="[
									checked
										? 'bg-indigo-600 text-white '
										: 'bg-white border border-gray-200',
								]"
								class="relative flex flex-1 px-5 py-4 rounded-lg shadow-md cursor-pointer focus:outline-none"
							>
								<div class="flex flex-col items-center justify-between w-full space-y-4">
									<div
										class="border border-gray-300 rounded-lg w-full h-32 bg-white"
									></div>
									<div class="flex justify-between items-center w-full">
										<div class="text-sm">
											<RadioGroupLabel
												as="p"
												:class="checked ? 'text-white' : 'text-gray-900'"
												class="font-medium"
											>
												{{ opt.title }}
											</RadioGroupLabel>
											<RadioGroupDescription
												as="span"
												:class="checked ? 'text-sky-100' : 'text-gray-500'"
												class="inline"
											>
												<span>Description</span>
											</RadioGroupDescription>
										</div>
										<CheckCircleIcon v-if="checked" class="h-6 w-6" />
									</div>
								</div>
							</div>
						</RadioGroupOption>
					</div>
				</RadioGroup>
			</div>
		</section>
		<section class="my-4">
			<Subtitle>Fonctionnement</Subtitle>
			<div>
				<h3 class="font-medium text-xl">Réservations</h3>
				<RadioGroup v-model="selectedBookingShowOthers">
					<RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
					<div class="flex flex-row space-x-4 my-4">
						<RadioGroupOption
							as="template"
							v-for="opt in bookingShowOthersOptions"
							:key="opt.title"
							:value="opt"
							v-slot="{ checked }"
						>
							<div
								:class="[
									checked
										? 'bg-indigo-600 text-white '
										: 'bg-white border border-gray-200',
								]"
								class="relative flex flex-1 px-5 py-4 rounded-lg shadow-md cursor-pointer focus:outline-none"
							>
								<div class="flex items-center justify-between w-full">
									<div class="flex items-center">
										<div class="text-sm">
											<RadioGroupLabel
												as="p"
												:class="checked ? 'text-white' : 'text-gray-900'"
												class="font-medium"
											>
												{{ opt.title }}
											</RadioGroupLabel>
											<RadioGroupDescription
												as="span"
												:class="checked ? 'text-sky-100' : 'text-gray-500'"
												class="inline"
											>
												<span>{{ opt.description }}</span>
											</RadioGroupDescription>
										</div>
									</div>
									<CheckCircleIcon v-if="checked" class="h-6 w-6" />
								</div>
							</div>
						</RadioGroupOption>
					</div>
				</RadioGroup>
			</div>
		</section>
		<section class="my-4">
			<Button @click="savePreferences">Sauvegarder</Button>
		</section>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import Button from "@/components/Button/Button.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import Subtitle from "@/components/Subtitle.vue";
import labels from "@/labels/fr/labels.json";
import {
	RadioGroup,
	RadioGroupDescription,
	RadioGroupLabel,
	RadioGroupOption,
} from "@headlessui/vue";
import { CheckCircleIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "SettingsView",
	components: {
		Button,
		CheckCircleIcon,
		DefaultLayout,
		RadioGroup,
		RadioGroupLabel,
		RadioGroupDescription,
		RadioGroupOption,
		Subtitle,
	},
	setup() {
		const selectedDisplayList = ref();
		const selectedBookingShowOthers = ref();

		onMounted(async () => {
			// dispatch("initializePreferences", auth.value.user.sub).then((data: PreferencesState) => {
			// 	selectedDisplayList.value = displayListOptions.find(
			// 		(opt) => opt.value === data.displayList
			// 	);
			// 	selectedBookingShowOthers.value = bookingShowOthersOptions.find(
			// 		(opt) => opt.value === data.bookingShowOthers
			// 	);
			// });
		});

		const displayListOptions = [
			{
				title: "Liste",
				value: true,
			},
			{
				title: "Grille",
				value: false,
			},
		];

		const bookingShowOthersOptions = [
			{
				title: "Oui",
				description: "J'accepte de montrer aux autres que c'est moi qui réserve un cadeau.",
				value: true,
			},
			{
				title: "Non",
				description:
					"Je n'accepte pas de montrer aux autres que c'est moi qui réserve un cadeau.",
				value: false,
			},
		];

		// watch(selectedDisplayList, () => {
		// 	console.log("Grid mode is disabled for now");

		// 	const metadata = {
		// 		...state.preferences,
		// 		displayList: selectedDisplayList.value?.value,
		// 	};

		// 	dispatch("changePreferences", metadata);
		// });

		// watch(selectedBookingShowOthers, () => {
		// 	const metadata = {
		// 		...state.preferences,
		// 		bookingShowOthers: selectedBookingShowOthers.value?.value,
		// 	};
		// 	dispatch("changePreferences", metadata);
		// });

		// const savePreferences = async () => {
		// 	dispatch("savePreferences", auth.value.user.sub);
		// };

		return {
			labels,
			selectedDisplayList,
			displayListOptions,
			selectedBookingShowOthers,
			bookingShowOthersOptions,
		};
	},
});
</script>
