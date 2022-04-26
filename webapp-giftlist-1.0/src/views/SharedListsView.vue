<template>
	<DefaultLayout :title="labels.titles.shared">
		<div v-if="loading" class="absolute top-0 bottom-0 right-0 left-0 grid place-items-center">
			<GiftlistLoader class="w-16 h-16" />
		</div>
		<div v-else>
			<div
				v-if="lists.length === 0"
				class="absolute w-full h-full flex flex-col justify-center items-center text-gray-400 gap-8"
			>
				<div class="text-lg">{{ labels.sharedLists.empty.description }}</div>
				<UserGroupIcon class="w-1/6" />
				<GiftlistButton
					btn-style="primary-soft"
					has-icon
					@click="router.push(`/app/shared/new`)"
				>
					<template #icon>
						<QrcodeIcon />
					</template>
					{{ labels.sharedLists.empty.button }}
				</GiftlistButton>
			</div>
			<div v-else>
				<Table :headers="tableHeaders" @sort="handleSort">
					<tr
						v-for="list in lists"
						:key="list.id"
						class="cursor-pointer hover:bg-gray-50"
						@click="router.push(`/app/shared/${list.sharingCode}`)"
					>
						<ListItem :list="list" :shared="true" @details="handleDetailsModal" />
					</tr>
				</Table>
			</div>
			<GiftlistModal
				:show="newSharingCodeModalIsOpen"
				:title="labels.modals.code.title"
				:confirm-text="labels.modals.code.confirm"
				:cancel-text="labels.modals.code.cancel"
				:btn-loading="newSharingCodeButtonIsLoading"
				@confirm="confirmNewSharingCode"
				@close="closeNewSharingCodeModal"
			>
				<InputText
					:label="newSharingCodeData.label"
					:value="newSharingCodeData.code"
					:helper-text="newSharingCodeData.helperText"
					:is-error="newSharingCodeData.isError"
					:error-message="newSharingCodeData.errorMessage"
					:placeholder="newSharingCodeData.placeholder"
					focus
					reset
					@change="(newCode) => (newSharingCodeData.code = newCode)"
					@keydown.enter="confirmNewSharingCode"
				/>
			</GiftlistModal>
			<GiftlistModal
				:show="detailsModal.show"
				:title="detailsModal.list.title || ''"
				:confirm-text="labels.modals.listDetails.confirm"
				@close="handleDetailsModal"
				@confirm="openList"
			>
				<p>Détails de la liste</p>
				<p>Propriétaire(s):</p>
				<p>Nombre de cadeaux disponibles / réservés</p>
			</GiftlistModal>
		</div>
	</DefaultLayout>
</template>

<script setup lang="ts">
import { computed, ComputedRef, Ref, inject, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { Auth0Client } from "@auth0/auth0-spa-js";

import labels from "@/labels/fr/labels.json";

import { List } from "@/types/api/List";
import { ListDTO } from "@/types/dto/ListDTO";
import { GetListsPayload } from "@/types/payload/GetListsPayload";
import { ListSharingCodePayload } from "@/types/payload/ListSharingCodePayload";
import { TableHeader } from "@/types/TableHeader.ts";

import GiftlistButton from "@/components/GiftlistButton.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import InputText from "@/components/InputText.vue";
import ListItem from "@/components/ListItem.vue";
import GiftlistLoader from "@/components/GiftlistLoader.vue";
import GiftlistModal from "@/components/GiftlistModal.vue";
import Table from "@/components/GiftlistTable.vue";

import { QrcodeIcon, UserGroupIcon } from "@heroicons/vue/outline";

/******** Basic imports ********/
const router = useRouter();
const { dispatch, state } = useStore();
const auth = inject("Auth") as Auth0Client;

/******** Static data ********/

/******** Reactive data ********/
const loading = ref(true);
const newSharingCodeButtonIsLoading = ref(false);
const tableHeaders: Ref<TableHeader[]> = ref([
	{ title: "", width: "w-8", sortable: false },
	{ title: labels.tables.list.title, sortable: true, sorted: "none" },
	{ title: labels.tables.list.owners, sortable: true, sorted: "none" },
	{ title: labels.tables.list.termDate, sortable: true, sorted: "none" },
]);
const newSharingCodeData = ref({
	code: "",
	errorMessage: "",
	isError: false,
	helperText: labels.modals.code.input.helperText,
	label: labels.modals.code.input.label,
	placeholder: labels.modals.code.input.placeholder,
});
const detailsModal = ref({
	show: false,
	list: {} as List,
});

/******** Computed data ********/
const lists: ComputedRef<ListDTO[]> = computed(() => state.lists.granted);
const newSharingCodeModalIsOpen = computed(
	() => router.currentRoute.value.path === "/app/shared/new"
);

/******** Watch ********/
watch(
	() => newSharingCodeData.value.code,
	(val, old) => {
		if (val !== old) {
			newSharingCodeData.value.isError = false;
			newSharingCodeData.value.errorMessage = "";
		}
	}
);

watch(newSharingCodeModalIsOpen, () => {
	if (!newSharingCodeModalIsOpen.value) {
		setTimeout(() => {
			newSharingCodeData.value.errorMessage = "";
			newSharingCodeData.value.isError = false;
		}, 500);
	} else {
		newSharingCodeData.value.code = "";
	}
});

/******** Fetch page data ********/
onMounted(async () => {
	const actionPayload: GetListsPayload = {
		auth,
		select: "granted",
	};
	const success = await dispatch("getLists", actionPayload);
	loading.value = !success;
});

/******** Methods ********/
const handleSort = (headers: Array<TableHeader[]>) => {
	tableHeaders.value = headers;

	// TODO : Sort displayed data depending on tableHeaders sorted properties
};

const openList = () => {
	router.push("/app/shared/" + detailsModal.value.list.sharingCode);
};

const closeNewSharingCodeModal = () => {
	router.push("/app/shared");
};

const confirmNewSharingCode = async () => {
	newSharingCodeButtonIsLoading.value = true;
	const actionPayload: ListSharingCodePayload = {
		auth,
		sharingCode: newSharingCodeData.value.code,
	};
	const success = await dispatch("accessList", actionPayload);
	if (success) {
		router.push(`/app/shared/${newSharingCodeData.value.code}`);
		setTimeout(() => {
			newSharingCodeButtonIsLoading.value = false;
		}, 300);
	} else {
		newSharingCodeButtonIsLoading.value = false;
		newSharingCodeData.value.isError = true;
		newSharingCodeData.value.errorMessage = "Une erreur s'est produite...";
	}
};

const handleDetailsModal = (list?: List) => {
	detailsModal.value.show = !detailsModal.value.show;
	if (list) {
		detailsModal.value.list = list;
	}
};
</script>
