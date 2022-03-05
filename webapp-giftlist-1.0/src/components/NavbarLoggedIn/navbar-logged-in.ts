import { computed, defineComponent, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

import Button from '@/components/Button/Button.vue';
import NavbarDropdownMenu from '@/components/NavbarDropdownMenu/NavbarDropdownMenu.vue';
import NavbarItem from '@/components/NavbarItem/NavbarItem.vue';
import labels from '@/labels/fr/labels.json';
import { CollectionIcon, GiftIcon, PlusCircleIcon, UserGroupIcon } from '@heroicons/vue/outline';

export default defineComponent({
	name: "NavbarLoggedIn",
	components: {
		Button,
		NavbarItem,
		NavbarDropdownMenu,
		CollectionIcon,
		PlusCircleIcon,
		UserGroupIcon,
		GiftIcon,
	},
	setup() {
		const router = useRouter();
		const currentRoute = router.currentRoute;
		const auth = ref(inject("Auth") as any);

		const logout = () => {
			auth.value.logout({
				returnTo: window.location.origin,
			});
		};
		const cta = computed(() => currentRoute.value.meta.navbarCta);

		return {
			labels,
			logout,
			cta,
		};
	},
});
