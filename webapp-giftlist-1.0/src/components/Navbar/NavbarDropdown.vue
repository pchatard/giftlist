<template>
	<div class="ml-2 cursor-pointer giftlist-dropdown">
		<div
			@click="toggleDropdown"
			class="
				flex flex-row
				justify-between
				items-center
				border border-gray-100
				rounded-md
				shadow-sm
				py-2
				px-4
				hover:border-gray-200
			"
			:class="{ 'border-gray-200 active': showDropdown }"
		>
			<UserCircleIcon
				class="h-5 w-5 text-gray-400 transition-all duration-200 giftlist-user-circle-icon"
			/>
			<span class="ml-2 mr-4">{{ fullname }}</span>
			<ChevronDownIcon
				class="h-5 w-5 text-gray-400 giftlist-chevron-icon transition-all duration-300"
			/>
		</div>
		<div
			v-show="showDropdown"
			class="
				absolute
				border border-gray-200
				bg-white
				shadow-md
				overflow-hidden
				rounded-md
				z-10
				top-14
				right-6
				flex flex-col
			"
		>
			<div @click="redirectToProfile" class="giftlist-dropdown-option">
				<UserIcon class="w-4 h-4 giftlist-user-icon" />
				<span>Mon compte</span>
			</div>
			<div @click="$emit('logout')" class="giftlist-dropdown-option">
				<LogoutIcon class="w-4 h-4 giftlist-logout-icon" />
				<span>Déconnexion</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { UserIcon, UserCircleIcon, LogoutIcon } from "@heroicons/vue/outline";
import { ChevronDownIcon } from "@heroicons/vue/solid";

export default defineComponent({
	name: "NavbarDropdown",
	components: {
		UserIcon,
		UserCircleIcon,
		ChevronDownIcon,
		LogoutIcon,
	},
	props: {
		fullname: {
			type: String,
			required: true,
		},
	},
	setup() {
		const showDropdown = ref(false);
		const router = useRouter();

		const toggleDropdown = () => {
			showDropdown.value = !showDropdown.value;
		};

		const redirectToProfile = () => {
			showDropdown.value = false;
			router.push("/app/profile");
		};

		return {
			showDropdown,
			toggleDropdown,
			redirectToProfile,
		};
	},
});
</script>

<style lang="scss" scoped>
.giftlist {
	&-dropdown {
		&-option {
			@apply px-4 py-2 flex flex-row justify-start items-center;

			span {
				@apply mx-6;
			}

			&:hover {
				@apply bg-gray-50;
			}
		}

		.active {
			.giftlist-chevron-icon {
				@apply text-black transform rotate-180;
			}

			.giftlist-user-circle-icon {
				@apply text-black;
			}
		}

		&:hover {
			.giftlist-user-circle-icon {
				@apply text-yellow-400;
			}
		}
	}
}
</style>
