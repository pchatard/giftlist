import { computed, ComputedRef, defineComponent, inject, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import InputText from "@/components/InputText/InputText.vue";
import ListItem from "@/components/ListItem/ListItem.vue";
import Modal from "@/components/Modal/Modal.vue";
import Table from "@/components/Table/Table.vue";
import labels from "@/labels/fr/labels.json";
import { List } from "@/types/api/List";
import { ListDTO } from "@/types/dto/ListDTO";
import { GetListsPayload } from "@/types/payload/GetListsPayload";
import { ListSharingCodePayload } from "@/types/payload/ListSharingCodePayload";
import { Auth0Client } from "@auth0/auth0-spa-js";

export default defineComponent({
	name: "SharedLists",
	components: {
		DefaultLayout,
		Modal,
		ListItem,
		Table,
		InputText,
	},
	setup() {
		/******** Basic imports ********/
		const router = useRouter();
		const { dispatch, state } = useStore();
		const auth = inject("Auth") as Auth0Client;

		/******** Static data ********/

		/******** Reactive data ********/
		const loading = ref(true);
		const tableHeaders = ref([
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
		const handleSort = (headers: Array<any>) => {
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
			const actionPayload: ListSharingCodePayload = {
				auth,
				sharingCode: newSharingCodeData.value.code,
			};
			const success = await dispatch("accessList", actionPayload);
			if (success) {
				router.push(`/app/shared/${newSharingCodeData.value.code}`);
			} else {
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

		return {
			loading,
			labels,
			router,
			lists,
			openList,
			tableHeaders,
			newSharingCodeData,
			newSharingCodeModalIsOpen,
			closeNewSharingCodeModal,
			confirmNewSharingCode,
			detailsModal,
			handleDetailsModal,
			handleSort,
		};
	},
});
