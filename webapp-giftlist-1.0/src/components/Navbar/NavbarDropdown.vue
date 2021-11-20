<template>
	<div class="text-right ml-2">
		<Menu as="div" class="relative inline-block text-left">
			<div>
				<MenuButton
					class="
						inline-flex
						justify-center
						items-center
						w-full
						px-4
						py-2
						text-sm text-black
						bg-white
						rounded-md
						shadow-sm
						border border-gray-100
						hover:border-gray-200
						focus:outline-none
					"
				>
					<UserCircleIcon class="h-5 w-5 mr-2 text-gray-400" />
					{{ fullname }}
					<ChevronDownIcon class="w-5 h-5 ml-4 -mr-1 text-black" aria-hidden="true" />
				</MenuButton>
			</div>

			<transition
				enter-active-class="transition duration-100 ease-out"
				enter-from-class="transform scale-95 opacity-0"
				enter-to-class="transform scale-100 opacity-100"
				leave-active-class="transition duration-75 ease-in"
				leave-from-class="transform scale-100 opacity-100"
				leave-to-class="transform scale-95 opacity-0"
			>
				<MenuItems
					class="
						absolute
						right-0
						w-56
						mt-2
						origin-top-right
						bg-white
						divide-y divide-gray-100
						rounded-md
						shadow-lg
						ring-1 ring-black ring-opacity-5
						focus:outline-none
					"
				>
					<div>
						<MenuItem v-slot="{ active }">
							<button
								:class="[
									active ? 'bg-gray-50 text-indigo-600' : 'text-black',
									'group flex rounded-md items-center w-full px-4 py-3 text-sm',
								]"
								@click="redirectToProfile"
							>
								<UserIcon class="w-5 h-5 mr-2" />
								Mon compte
							</button>
						</MenuItem>
						<MenuItem v-slot="{ active }">
							<button
								:class="[
									active ? 'bg-gray-50 text-indigo-600' : 'text-black',
									'group flex rounded-md items-center w-full px-4 py-3 text-sm',
								]"
							>
								<CogIcon class="w-5 h-5 mr-2" />
								Préférences
							</button>
						</MenuItem>
					</div>
					<MenuItem v-slot="{ active }">
						<button
							:class="[
								active ? 'bg-gray-50 text-red-600' : 'text-black',
								'group flex rounded-md items-center w-full px-4 py-3 text-sm',
							]"
							@click="$emit('logout')"
						>
							<LogoutIcon class="w-5 h-5 mr-2" />
							Déconnexion
						</button>
					</MenuItem>
				</MenuItems>
			</transition>
		</Menu>
	</div>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { CogIcon, UserCircleIcon, LogoutIcon, UserIcon } from "@heroicons/vue/outline";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { useRouter } from "vue-router";

export default {
	name: "NavbarDropdown",
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
	},
	props: {
		fullname: {
			type: String,
			required: true,
		},
	},
	setup() {
		const router = useRouter();

		const redirectToProfile = () => {
			router.push("/app/profile");
		};

		return {
			redirectToProfile,
		};
	},
};
</script>
