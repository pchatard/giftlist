<template>
	<DefaultLayout title="Styles">
		<h1 class="font-test">Hello world</h1>

		<GiftlistSubtitle>Buttons</GiftlistSubtitle>
		<div class="grid grid-flow-col-dense">
			<div class="flex flex-col gap-2 items-start">
				<GiftlistButton :btn-style="ButtonStyleEnum.primary">Sauvegarder</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.primarySoft">Sauvegarder</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.secondary">Sauvegarder</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.secondarySoft">Sauvegarder</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.danger">Sauvegarder</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.dangerSoft">Sauvegarder</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.success">Sauvegarder</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.successSoft">Sauvegarder</GiftlistButton>
			</div>
			<div class="flex flex-col gap-2 items-start">
				<GiftlistButton :btn-style="ButtonStyleEnum.primary" loading
					>Sauvegarder</GiftlistButton
				>
				<GiftlistButton :btn-style="ButtonStyleEnum.primarySoft" loading
					>Sauvegarder</GiftlistButton
				>
				<GiftlistButton :btn-style="ButtonStyleEnum.secondary" loading
					>Sauvegarder</GiftlistButton
				>
				<GiftlistButton :btn-style="ButtonStyleEnum.secondarySoft" loading
					>Sauvegarder</GiftlistButton
				>
				<GiftlistButton :btn-style="ButtonStyleEnum.danger" loading>Sauvegarder</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.dangerSoft" loading
					>Sauvegarder</GiftlistButton
				>
				<GiftlistButton :btn-style="ButtonStyleEnum.success" loading
					>Sauvegarder</GiftlistButton
				>
				<GiftlistButton :btn-style="ButtonStyleEnum.successSoft" loading
					>Sauvegarder</GiftlistButton
				>
			</div>
			<div class="flex flex-col gap-2 items-start">
				<GiftlistButton :btn-style="ButtonStyleEnum.primary" has-icon>
					<template #icon>
						<PlusCircleIcon />
					</template>
					Primary
				</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.primarySoft" has-icon>
					<template #icon>
						<PlusCircleIcon /> </template
					>Sauvegarder
				</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.secondary" has-icon>
					<template #icon>
						<PlusCircleIcon /> </template
					>Sauvegarder
				</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.secondarySoft" has-icon>
					<template #icon>
						<PlusCircleIcon /> </template
					>Sauvegarder
				</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.danger" has-icon>
					<template #icon>
						<PlusCircleIcon /> </template
					>Sauvegarder
				</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.dangerSoft" has-icon>
					<template #icon>
						<PlusCircleIcon /> </template
					>Sauvegarder
				</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.success" has-icon>
					<template #icon>
						<PlusCircleIcon /> </template
					>Sauvegarder
				</GiftlistButton>
				<GiftlistButton :btn-style="ButtonStyleEnum.successSoft" has-icon>
					<template #icon>
						<PlusCircleIcon /> </template
					>Sauvegarder
				</GiftlistButton>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from "@/components/DefaultLayout.vue";
import GiftlistButton from "@/components/GiftlistButton.vue";
import GiftlistSubtitle from "@/components/GiftlistSubtitle.vue";

import { PlusCircleIcon } from "@heroicons/vue/outline";

import { ButtonStyleEnum } from "@/types/enums/ButtonStyleEnum";
</script>

<style lang="scss" scoped>
td,
th {
	text-align: center;
	padding: 10px;
}
</style>
