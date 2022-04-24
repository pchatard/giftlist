import { defineComponent, onMounted, ref } from "vue";

import Button from "@/components/Button/Button.vue";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import Subtitle from "@/components/Subtitle/Subtitle.vue";
import labels from "@/labels/fr/labels.json";
import {
	RadioGroup,
	RadioGroupDescription,
	RadioGroupLabel,
	RadioGroupOption,
} from "@headlessui/vue";
import { CheckCircleIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "Settings",
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
