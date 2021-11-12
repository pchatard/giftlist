<template>
	<div class="ml-4 cursor-pointer">
		<div @click="toggleDropdown">
			<span>{{ fullname }}</span>
			<span>Flèche</span>
		</div>
		<div
			v-show="showDropdown"
			class="
				absolute
				border border-yellow-400
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
			<span @click="redirectToProfile" class="giftlist-dropdown">Mon compte</span>
			<span @click="$emit('logout')" class="giftlist-dropdown">Déconnexion</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "NavbarDropdown",
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
.giftlist-dropdown {
	@apply px-10 py-2;

	&:hover {
		@apply bg-gray-50;
	}
}
</style>
