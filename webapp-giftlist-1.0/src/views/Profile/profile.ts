import { defineComponent, inject, ref } from 'vue';

import Button from '@/components/Styled/Button.vue';
import DefaultLayout from '@/components/Styled/DefaultLayout.vue';
import Subtitle from '@/components/Styled/Subtitle.vue';
import labels from '@/labels/fr/labels.json';

export default defineComponent({
	name: "Profile",
	components: { Button, DefaultLayout, Subtitle },
	setup() {
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
			friends,
			verifyEmail,
			changeEmail,
			changePassword,
			downloadData,
		};
	},
});
