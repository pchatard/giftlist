import { defineComponent, inject, ref } from "vue";

import Button from "@/components/Button/Button.vue";
import labels from "@/labels/fr/labels.json";

export default defineComponent({
	name: "NavbarLoggedOut",
	components: {
		Button,
	},
	setup() {
		const auth = ref(inject("Auth") as any);
		const login = async () => {
			await auth.value.loginWithRedirect({
				redirect_uri: window.location.origin + "/app/lists",
			});
		};

		return {
			labels,
			auth,
			login,
		};
	},
});
