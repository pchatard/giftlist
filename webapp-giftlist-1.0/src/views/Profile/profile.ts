import { defineComponent, inject, onMounted, Ref, ref } from "vue";

import Button from "@/components/Button/Button.vue";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import Subtitle from "@/components/Subtitle/Subtitle.vue";
import labels from "@/labels/fr/labels.json";
import Users from "@/api/Users";
import { UserDTO } from "@/types/dto/UserDTO";

export default defineComponent({
	name: "Profile",
	components: { Button, DefaultLayout, Subtitle },
	setup() {
		const user: Ref<UserDTO | undefined> = ref();
		onMounted(async () => {
			user.value = await Users.me();
		});

		const auth = ref(inject("Auth") as any);
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

		return {
			labels,
			auth,
			user,
			friends,
			verifyEmail,
			changeEmail,
			changePassword,
			downloadData,
		};
	},
});
