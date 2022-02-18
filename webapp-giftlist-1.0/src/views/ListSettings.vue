<template>
	<DefaultLayout :title="labels.titles.listSettings" back>
		<div class="w-10/12 mx-auto">
			<Disclosure v-slot="{ open }">
				<DisclosureButton
					@click="handleOpen('general')"
					class="
						flex
						justify-between
						w-full
						px-4
						py-4
						text-sm
						font-medium
						text-left text-indigo-900
						bg-indigo-100
						rounded-lg
						hover:bg-indigo-200
						focus:outline-none
						focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75
					"
				>
					<span>{{ labels.listOptions.generalTitle }}</span>
					<ChevronUpIcon
						:class="open ? 'transform rotate-180' : ''"
						class="w-5 h-5 text-indigo-500"
					/>
				</DisclosureButton>
				<transition
					enter-active-class="transition duration-300 ease-out"
					enter-from-class="transform opacity-0"
					enter-to-class="transform opacity-100"
				>
					<DisclosurePanel
						v-show="openGeneral"
						static
						class="px-4 pt-4 pb-2 text-sm text-black"
					>
						<ListFormStep1
							:values="generalInformation"
							@change="handleGeneralInformationChange"
						/>
					</DisclosurePanel>
				</transition>
			</Disclosure>
			<Disclosure as="div" class="mt-2" v-slot="{ open }">
				<DisclosureButton
					@click="handleOpen('share')"
					class="
						flex
						justify-between
						w-full
						px-4
						py-4
						text-sm
						font-medium
						text-left text-indigo-900
						bg-indigo-100
						rounded-lg
						hover:bg-indigo-200
						focus:outline-none
						focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75
					"
				>
					<span>{{ labels.listOptions.sharingTitle }}</span>
					<ChevronUpIcon
						:class="open ? 'transform rotate-180' : ''"
						class="w-5 h-5 text-indigo-500"
					/>
				</DisclosureButton>
				<transition
					enter-active-class="transition duration-300 ease-out"
					enter-from-class="transform opacity-0"
					enter-to-class="transform opacity-100"
				>
					<DisclosurePanel v-show="openShare" static class="px-4 pt-4 pb-2 text-sm text-black">
						<ListFormStep2 :values="sharingOptions" @change="handleSharingOptionsChange" />
					</DisclosurePanel>
				</transition>
			</Disclosure>

			<div class="flex justify-end gap-4 mt-4">
				<Button btnStyle="danger" @click="cancel">Retour</Button>
				<Button btnStyle="primary" @click="saveChanges">Enregistrer les changements</Button>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import labels from "@/labels/fr/labels.json";

import Button from "@/components/Styled/Button.vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import ListFormStep1 from "@/components/List/ListFormStep1.vue";
import ListFormStep2 from "@/components/List/ListFormStep2.vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
	name: "ListSettings",
	components: {
		Button,
		ChevronUpIcon,
		DefaultLayout,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		ListFormStep1,
		ListFormStep2,
	},
	setup() {
		const router = useRouter();
		const { dispatch } = useStore();

		const initializeDate = () => {
			let date = new Date();
			date.setDate(date.getDate() + 1);
			const offset = date.getTimezoneOffset();
			date = new Date(date.getTime() - offset * 60 * 1000);
			return date;
		};

		// TODO: Fill with list data
		const generalInformation = ref({
			title: {
				label: labels.listOptions.inputs.title.label,
				value: "",
				errorMessage: "",
				helperText: labels.listOptions.inputs.title.helperText,
				placeholder: labels.listOptions.inputs.title.placeholder,
				required: true,
			},
			description: {
				label: labels.listOptions.inputs.description.label,
				value: "",
				placeholder: labels.listOptions.inputs.description.placeholder,
				helperText: labels.listOptions.inputs.description.helperText,
				errorMessage: "",
				required: false,
			},
			activateTermDate: {
				value: false,
				label: labels.listOptions.inputs.activateTermDate.label,
				helperText: labels.listOptions.inputs.activateTermDate.helperText,
			},
			termDate: {
				label: labels.listOptions.inputs.termDate.label,
				value: initializeDate().toISOString().split("T")[0],
				helperText: labels.listOptions.inputs.termDate.helperText,
				errorMessage: "",
			},
		});

		// TODO: Fill with list data
		const sharingOptions = ref({
			shared: {
				value: false,
				label: labels.listOptions.inputs.shared.label,
				helperText: labels.listOptions.inputs.shared.helperText,
			},
			friends: [
				{ id: 1, name: "Arnold A." },
				{ id: 12, name: "Ben 10" },
				{ id: 13, name: "Carl Os" },
				{ id: 14, name: "Denis D." },
				{ id: 15, name: "Elliot E." },
				{ id: 25, name: "Fabrice L." },
				{ id: 54, name: "Guéric G." },
				{ id: 47, name: "Hans H." },
			],
			owners: {
				label: labels.listOptions.inputs.owners.label,
				helperText: labels.listOptions.inputs.owners.helperText,
				value: [],
			},
			authorizedUsers: {
				label: labels.listOptions.inputs.authorizedUsers.label,
				helperText: labels.listOptions.inputs.authorizedUsers.helperText,
				value: [],
			},
		});

		const openGeneral = ref(true);
		const openShare = ref(false);

		const handleOpen = (tab: string) => {
			if (tab === "general") {
				openGeneral.value = !openGeneral.value;
			} else if (tab === "share") {
				openShare.value = !openShare.value;
			}
		};

		const handleGeneralInformationChange = (values: any) => {
			generalInformation.value = values;
		};

		const handleSharingOptionsChange = (values: any) => {
			sharingOptions.value = values;
		};

		const cancel = () => {
			router.go(-1);
		};

		const saveChanges = () => {
			if (validateListData()) {
				dispatch("updateList")
					.then(() => {
						router.go(-1);
						// Update data if necessary
					})
					.catch((err) => {
						// TODO
					});
			}
		};

		const validateListData = (): boolean => {
			// TODO
			let validate = true;
			return validate;
		};

		return {
			labels,
			generalInformation,
			handleGeneralInformationChange,
			handleSharingOptionsChange,
			sharingOptions,
			openGeneral,
			openShare,
			handleOpen,
			cancel,
			saveChanges,
		};
	},
});
</script>
