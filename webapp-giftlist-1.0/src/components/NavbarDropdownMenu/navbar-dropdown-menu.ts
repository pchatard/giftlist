import { useRouter } from 'vue-router';

import labels from '@/labels/fr/labels.json';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { CogIcon, LogoutIcon, UserCircleIcon, UserIcon, UsersIcon } from '@heroicons/vue/outline';
import { ChevronDownIcon } from '@heroicons/vue/solid';
import { ref } from '@vue/reactivity';
import { inject } from '@vue/runtime-core';

export default {
	name: "NavbarDropdownMenu",
	components: {
		ChevronDownIcon,
		CogIcon,
		LogoutIcon,
		Menu,
		MenuButton,
		MenuItems,
		MenuItem,
		UserCircleIcon,
		UserIcon,
		UsersIcon,
	},
	setup() {
		const router = useRouter();
		const auth = ref(inject("Auth") as any);

		const redirectToProfile = () => {
			router.push("/app/profile");
		};

		const redirectToFriends = () => {
			router.push("/app/profile/friends");
		};

		const redirectToSettings = () => {
			router.push("/app/settings");
		};

		return {
			labels,
			auth,
			redirectToProfile,
			redirectToFriends,
			redirectToSettings,
		};
	},
};
