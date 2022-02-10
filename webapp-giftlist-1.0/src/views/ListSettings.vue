<template>
	<DefaultLayout title="Options" back>
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
					<span>Informations générales</span>
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
					<span>Options de partage</span>
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
				label: "Titre",
				value: "",
				errorMessage: "",
				helperText: "Le titre de votre nouvelle liste",
				placeholder: "Mes 18 ans",
				required: true,
			},
			description: {
				label: "Description",
				value: "",
				placeholder: "La wishlist de la majorité",
				helperText: "Une rapide description de votre liste",
				errorMessage: "",
				required: false,
			},
			activateTermDate: false,
			termDate: {
				label: "Date d'échéance de votre liste",
				value: initializeDate().toISOString().split("T")[0],
				helperText: "La date avant laquelle on doit vous offrir vos cadeaux",
				errorMessage: "",
			},
		});

		// TODO: Fill with list data
		const sharingOptions = ref({
			shared: false,
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
			owners: [],
			authorizedUsers: [],
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
