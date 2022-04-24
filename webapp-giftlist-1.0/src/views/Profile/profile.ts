import { computed, defineComponent, inject, onMounted, Ref } from "vue";
import { useStore } from "vuex";

import Button from "@/components/Button/Button.vue";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import Subtitle from "@/components/Subtitle/Subtitle.vue";
import labels from "@/labels/fr/labels.json";
import { UserDTO } from "@/types/dto/UserDTO";

export default defineComponent({
	name: "Profile",
	components: { Button, DefaultLayout, Subtitle },
	setup() {
		onMounted(async () => {
			await dispatch("getUser", auth);
		});

		const { state, dispatch } = useStore();
		const user: Ref<UserDTO> = computed(() => state.user);
		const auth = inject("Auth") as any;

		const friends = [
			{ id: 0, name: "ND" },
			{ id: 1, name: "ML" },
			{ id: 2, name: "PC" },
			{ id: 3, name: "ML" },
		];

		const verifyEmail = () => {
			console.log("Profile.vue - verifyEmail");
		};
		const changeEmail = () => {
			console.log("Profile.vue - changeEmail");
		};
		const changePassword = () => {
			console.log("Profile.vue - changePassword");
		};
		const downloadData = () => {
			console.log("Profile.vue - downloadData");
		};

		const deleteAccount = async () => {
			console.log("Profile.vue - deleteAccount");
			const deleteResult = await dispatch("deleteAccount", auth);
			if (deleteResult) {
				auth.logout({
					returnTo: window.location.origin,
				});
			}
		};

		return {
			labels,
			auth,
			user,
			friends,
			verifyEmail,
			changeEmail,
			changePassword,
			downloadData,
			deleteAccount,
		};
	},
});
