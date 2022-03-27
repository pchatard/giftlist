import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

import Title from "@/components/Title/Title.vue";
import labels from "@/labels/fr/labels.json";
import { ArrowLeftIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "ErrorLayout",
	components: { ArrowLeftIcon },
	props: {
		back: Boolean,
		backButtonTitle: {
			type: String,
			required: false,
		},
		backButtonLink: {
			type: String,
			required: false,
		},
	},
	setup(props) {
		const router = useRouter();

		const backText = computed(() => {
			const back = labels.defaultLayout.back;
			if (props.backButtonTitle) {
				return `${back} vers ${props.backButtonTitle}`;
			}
			return back;
		});

		const handleBackButtonClick = () => {
			if (props.backButtonLink) {
				router.push(props.backButtonLink);
			} else {
				router.go(-1);
			}
		};

		return {
			backText,
			handleBackButtonClick,
		};
	},
});
