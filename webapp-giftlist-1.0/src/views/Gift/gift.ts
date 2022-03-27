import { computed, ComputedRef, defineComponent, inject, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Button from "@/components/Button/Button.vue";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import GiftForm from "@/components/GiftForm/GiftForm.vue";
import Loader from "@/components/Loader/Loader.vue";
import Modal from "@/components/Modal/Modal.vue";
import labels from "@/labels/fr/labels.json";
import { GiftCategory } from "@/types/api/GiftCategory";
import { GiftDTO } from "@/types/dto/GiftDTO";
import { ListDTO } from "@/types/dto/ListDTO";
import { PartialGiftDTO } from "@/types/dto/PartialGiftDTO";
import { EditGiftPayload } from "@/types/payload/EditGiftPayload";
import { GiftIdPayload } from "@/types/payload/GiftIdPayload";
import { ListIdPayload } from "@/types/payload/ListIdPayload";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { TrashIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "Gift",
	components: {
		DefaultLayout,
		GiftForm,
		Button,
		Modal,
		TrashIcon,
		Loader,
	},
	setup() {
		/******** Basic imports ********/
		const router = useRouter();
		const { dispatch, state, commit } = useStore();
		const auth = inject("Auth") as Auth0Client;

		/******** Static imports ********/
		const listId = router.currentRoute.value.params.id as string;
		const giftId = router.currentRoute.value.params.giftId as string;

		const giftCategories: GiftCategory[] = [
			{ id: "x", name: "Général" },
			{ id: "0", name: "Vêtements" },
			{ id: "1", name: "Chaussures" },
			{ id: "2", name: "High-Tech" },
			{ id: "3", name: "Evènements" },
		];

		/******** Reactive data ********/
		const loading = ref(true);
		const confirmButtonIsLoading = ref(false);
		const deleteButtonIsLoading = ref(false);

		const modal = ref({
			showModal: false,
			title: labels.modals.deleteGift.title,
			confirmText: labels.modals.deleteGift.confirm,
			confirm: () => handleDeleteConfirm(),
		});

		const giftInformation = ref({
			title: {
				label: labels.gift.inputs.title.label,
				value: "",
				placeholder: labels.gift.inputs.title.placeholder,
				helperText: labels.gift.inputs.title.helperText,
				errorMessage: "",
				required: true,
			},
			isFavorite: {
				label: labels.gift.inputs.isFavorite.label,
				value: false,
				helperText: labels.gift.inputs.isFavorite.helperText,
			},
			price: {
				label: labels.gift.inputs.price.label,
				value: 0,
				placeholder: labels.gift.inputs.price.placeholder,
				helperText: labels.gift.inputs.price.helperText,
				errorMessage: "",
				required: false,
			},
			category: {
				label: labels.gift.inputs.category.label,
				value: giftCategories[0],
				options: giftCategories,
				helperText: labels.gift.inputs.category.helperText,
				errorMessage: "",
			},
			link: {
				label: labels.gift.inputs.link.label,
				value: "",
				placeholder: labels.gift.inputs.link.placeholder,
				helperText: labels.gift.inputs.link.helperText,
				errorMessage: "",
				required: false,
			},
			showDetails: {
				label: labels.gift.inputs.showDetails.label,
				value: false,
				helperText: labels.gift.inputs.showDetails.helperText,
			},
			brand: {
				label: labels.gift.inputs.brand.label,
				value: "",
				placeholder: labels.gift.inputs.brand.placeholder,
				helperText: labels.gift.inputs.brand.helperText,
				errorMessage: "",
				required: false,
			},
			size: {
				label: labels.gift.inputs.size.label,
				value: "",
				placeholder: labels.gift.inputs.size.placeholder,
				helperText: labels.gift.inputs.size.helperText,
				errorMessage: "",
				required: false,
			},
			color: {
				label: labels.gift.inputs.color.label,
				value: "",
				placeholder: labels.gift.inputs.color.placeholder,
				helperText: labels.gift.inputs.color.helperText,
				errorMessage: "",
				required: false,
			},
			comments: {
				label: labels.gift.inputs.comments.label,
				value: "",
				placeholder: labels.gift.inputs.comments.placeholder,
				helperText: labels.gift.inputs.comments.helperText,
				errorMessage: "",
				required: false,
			},
		});

		/******** Computed data ********/
		const list: ComputedRef<ListDTO> = computed(() => state.lists.selected);
		const gift: ComputedRef<GiftDTO> = computed(() => state.gifts.selected);
		const editedGift: ComputedRef<PartialGiftDTO> = computed(() => {
			const editedGift: PartialGiftDTO = {};

			if (giftInformation.value.title.value !== gift.value.title) {
				editedGift.title = giftInformation.value.title.value;
			}

			if (giftInformation.value.isFavorite.value !== gift.value.isFavorite) {
				editedGift.isFavorite = giftInformation.value.isFavorite.value;
			}

			if (giftInformation.value.category.value.name !== gift.value.category) {
				editedGift.category = giftInformation.value.category.value.name;
			}

			if (giftInformation.value.price.value !== gift.value.price) {
				editedGift.price = giftInformation.value.price.value;
			}

			if (giftInformation.value.link.value !== gift.value.linkURL) {
				editedGift.linkURL = giftInformation.value.link.value;
			}

			if (giftInformation.value.brand.value !== gift.value.brand) {
				editedGift.brand = giftInformation.value.brand.value;
			}

			if (giftInformation.value.color.value !== gift.value.color) {
				editedGift.color = giftInformation.value.color.value;
			}

			if (giftInformation.value.size.value !== gift.value.size) {
				editedGift.size = giftInformation.value.size.value;
			}

			if (giftInformation.value.comments.value !== gift.value.comments) {
				editedGift.comments = giftInformation.value.comments.value;
			}

			return editedGift;
		});

		/******** Fetch page data ********/
		onMounted(async () => {
			const listIdPayload: ListIdPayload = {
				auth,
				listId,
			};
			const successList = await dispatch("getList", listIdPayload);
			const giftIdPayload: GiftIdPayload = {
				auth,
				listId,
				giftId,
			};
			const successGift = await dispatch("getGift", giftIdPayload);
			if (successList && successGift) {
				initializeFormData();
				loading.value = false;
			}
		});

		onUnmounted(() => {
			commit("EMPTY_LIST");
			commit("EMPTY_GIFT");
		});

		/******** Methods ********/
		const initializeFormData = () => {
			giftInformation.value.title.value = gift.value.title;
			giftInformation.value.isFavorite.value = gift.value.isFavorite;
			giftInformation.value.price.value = gift.value.price || 0;
			giftInformation.value.category.value =
				giftCategories.find((cat) => cat.name === gift.value.category) || giftCategories[0];
			giftInformation.value.link.value = gift.value.linkURL || "";
			giftInformation.value.showDetails.value = ((gift.value.brand ||
				gift.value.size ||
				gift.value.color ||
				gift.value.comments) as unknown as boolean)
				? true
				: false;
			giftInformation.value.brand.value = gift.value.brand || "";
			giftInformation.value.size.value = gift.value.size || "";
			giftInformation.value.color.value = gift.value.color || "";
			giftInformation.value.comments.value = gift.value.comments || "";
		};

		const handleGiftInformationChange = (values: any) => {
			giftInformation.value = values;
		};

		const cancel = () => {
			router.go(-1);
		};

		const saveGiftChanges = async () => {
			confirmButtonIsLoading.value = true;

			// Validate fields
			if (!validateGiftFields()) {
				confirmButtonIsLoading.value = false;
				return;
			}

			const editGiftPayload: EditGiftPayload = {
				auth,
				listId,
				giftId,
				partialGift: editedGift.value,
			};

			// Call store action
			const success = await dispatch("editGift", editGiftPayload);
			if (success) {
				router.push("/app/lists/" + listId);
			}
			confirmButtonIsLoading.value = false;
		};

		const validateGiftFields = (): boolean => {
			let validate = true;

			if (!giftInformation.value.title.value) {
				giftInformation.value.title.errorMessage = labels.gift.inputs.title.errors.mandatory;
				validate = false;
			}

			return validate;
		};

		const handleDeleteModal = () => {
			modal.value.title = labels.modals.deleteGift.title + giftInformation.value.title.value;
			modal.value.showModal = true;
			modal.value.confirm = handleDeleteConfirm;
		};

		const handleDeleteConfirm = async () => {
			deleteButtonIsLoading.value = true;
			const giftIdPayload: GiftIdPayload = {
				auth,
				listId,
				giftId,
			};
			const success = await dispatch("deleteGift", giftIdPayload);
			if (success) {
				modal.value.showModal = false;
				router.go(-1);
			}
		};

		return {
			modal,
			handleDeleteModal,
			labels,
			loading,
			gift,
			list,
			giftInformation,
			handleGiftInformationChange,
			cancel,
			saveGiftChanges,
			confirmButtonIsLoading,
			deleteButtonIsLoading,
		};
	},
});
