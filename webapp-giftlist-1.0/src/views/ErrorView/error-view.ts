import { defineComponent } from "vue";
import ErrorLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import Button from "@/components/Button/Button.vue";
import { ExclamationIcon } from "@heroicons/vue/outline";
import router from "@/router";

export default defineComponent({
	name: "ErrorView",
	components: {
		ErrorLayout,
		ExclamationIcon,
		Button
	},
	setup() {
		return {
			router
		}
	}
});
