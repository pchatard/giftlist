import { defineComponent } from "vue";

import Button from "@/components/Button/Button.vue";
import ErrorLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import router from "@/router";
import { ExclamationIcon } from "@heroicons/vue/outline";

export default defineComponent({
	name: "ErrorView",
	components: {
		ErrorLayout,
		ExclamationIcon,
		Button,
	},
	setup() {
		return {
			router,
		};
	},
});
