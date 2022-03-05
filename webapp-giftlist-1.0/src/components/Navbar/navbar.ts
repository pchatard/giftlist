import { defineComponent, inject, ref } from "vue";

import NavbarLoggedIn from "@/components/NavbarLoggedIn/NavbarLoggedIn.vue";
import NavbarLoggedOut from "@/components/NavbarLoggedOut/NavbarLoggedOut.vue";

export default defineComponent({
	name: "Navbar",
	components: {
		NavbarLoggedIn,
		NavbarLoggedOut,
	},
	setup() {
		const auth = ref(inject("Auth") as any);

		const isAuthenticated = auth.value.isAuthenticated;

		return {
			isAuthenticated,
		};
	},
});
