<template>
	<DefaultLayout title="Styles">
		<GiftlistSubtitle>Colors</GiftlistSubtitle>
		<table>
			<thead>
				<th>Name</th>
				<th>Default</th>
				<th>Hover</th>
				<th>Text</th>
				<th>Light</th>
				<th>Light hover</th>
			</thead>
			<tbody>
				<tr>
					<td>Primary</td>
					<td>
						<span class="inline-block border w-10 h-8 bg-primary-default rounded"></span>
					</td>
					<td><span class="inline-block border w-10 h-8 bg-primary-hover rounded"></span></td>
					<td><span class="inline-block border w-10 h-8 bg-primary-text rounded"></span></td>
					<td><span class="inline-block border w-10 h-8 bg-primary-light rounded"></span></td>
					<td>
						<span class="inline-block border w-10 h-8 bg-primary-lightHover rounded"></span>
					</td>
				</tr>
				<tr>
					<td>Secondary</td>
					<td>
						<span class="inline-block border w-10 h-8 bg-secondary-default rounded"></span>
					</td>
					<td>
						<span class="inline-block border w-10 h-8 bg-secondary-hover rounded"></span>
					</td>
					<td><span class="inline-block border w-10 h-8 bg-secondary-text rounded"></span></td>
				</tr>
				<tr>
					<td>Success</td>
					<td>
						<span class="inline-block border w-10 h-8 bg-success-default rounded"></span>
					</td>
					<td><span class="inline-block border w-10 h-8 bg-success-hover rounded"></span></td>
					<td><span class="inline-block border w-10 h-8 bg-success-text rounded"></span></td>
					<td><span class="inline-block border w-10 h-8 bg-success-light rounded"></span></td>
					<td>
						<span class="inline-block border w-10 h-8 bg-success-lightHover rounded"></span>
					</td>
				</tr>
				<tr>
					<td>Danger</td>
					<td><span class="inline-block border w-10 h-8 bg-danger-default rounded"></span></td>
					<td><span class="inline-block border w-10 h-8 bg-danger-hover rounded"></span></td>
					<td><span class="inline-block border w-10 h-8 bg-danger-text rounded"></span></td>
					<td><span class="inline-block border w-10 h-8 bg-danger-light rounded"></span></td>
					<td>
						<span class="inline-block border w-10 h-8 bg-danger-lightHover rounded"></span>
					</td>
				</tr>
			</tbody>
		</table>

		<GiftlistSubtitle>Buttons</GiftlistSubtitle>
		<p>See <a href="https://uxdesign.cc/design-better-buttons-a5c90a113280">Button design</a></p>
		<p>See <a href="https://material.io/components/buttons#specs">Material Button design</a></p>
		<div class="flex gap-2">
			<GiftlistButton :btn-style="ButtonStyleEnum.primary">Primary</GiftlistButton>
			<GiftlistButton :btn-style="ButtonStyleEnum.primarySoft">Primary soft</GiftlistButton>
			<GiftlistButton :btn-style="ButtonStyleEnum.secondary">Secondary</GiftlistButton>
			<GiftlistButton :btn-style="ButtonStyleEnum.secondarySoft">Secondary soft</GiftlistButton>
			<GiftlistButton :btn-style="ButtonStyleEnum.danger">Danger</GiftlistButton>
			<GiftlistButton :btn-style="ButtonStyleEnum.dangerSoft">Danger soft</GiftlistButton>
			<GiftlistButton :btn-style="ButtonStyleEnum.greenSoft">Green</GiftlistButton>
		</div>
		<div class="flex gap-2">
			<GiftlistButton :btn-style="ButtonStyleEnum.primary" has-icon>
				<template #icon>
					<PlusCircleIcon />
				</template>
				Primary
			</GiftlistButton>
			<GiftlistButton :btn-style="ButtonStyleEnum.primarySoft" has-icon
				><template #icon>
					<PlusCircleIcon /> </template
				>Primary soft</GiftlistButton
			>
			<GiftlistButton :btn-style="ButtonStyleEnum.secondary" has-icon
				><template #icon>
					<PlusCircleIcon /> </template
				>Secondary</GiftlistButton
			>
			<GiftlistButton :btn-style="ButtonStyleEnum.secondarySoft" has-icon
				><template #icon>
					<PlusCircleIcon /> </template
				>Secondary soft</GiftlistButton
			>
			<GiftlistButton :btn-style="ButtonStyleEnum.danger" has-icon
				><template #icon>
					<PlusCircleIcon /> </template
				>Danger</GiftlistButton
			>
			<GiftlistButton :btn-style="ButtonStyleEnum.dangerSoft" has-icon
				><template #icon>
					<PlusCircleIcon /> </template
				>Danger soft</GiftlistButton
			>
			<GiftlistButton :btn-style="ButtonStyleEnum.greenSoft" has-icon
				><template #icon>
					<PlusCircleIcon /> </template
				>Green</GiftlistButton
			>
		</div>
		<!-- <div class="flex gap-2">
            <GiftlistButton :btn-style="ButtonStyleEnum.primary" loading>Primary</GiftlistButton>
            <GiftlistButton :btn-style="ButtonStyleEnum.primarySoft" loading>Primary soft</GiftlistButton>
            <GiftlistButton :btn-style="ButtonStyleEnum.secondary" loading>Secondary</GiftlistButton>
            <GiftlistButton :btn-style="ButtonStyleEnum.secondarySoft" loading>Secondary soft</GiftlistButton>
            <GiftlistButton :btn-style="ButtonStyleEnum.danger" loading>Danger</GiftlistButton>
            <GiftlistButton :btn-style="ButtonStyleEnum.dangerSoft" loading>Danger soft</GiftlistButton>
            <GiftlistButton :btn-style="ButtonStyleEnum.greenSoft" loading>Green</GiftlistButton>
        </div> -->
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
