<template>
	<div class="grid grid-cols-3 gap-4 divide-y">
		<div class="col-span-full grid grid-cols-3">
			<FormInputText class="col-span-1" label="Propriétaires" helperText="Test" />
			<div class="col-span-full flex items-center">
				<span>Propriétaires :</span>
				<div class="flex py-2 ml-4">
					<PersonTag text="Moi" class="px-4" hideDelete />
					<PersonTag
						class="ml-2"
						v-for="owner in values.owners"
						:key="owner.id"
						:text="owner.name"
						@delete="handleOwnersDelete(owner.id)"
					/>
				</div>
			</div>
		</div>

		<div class="col-span-full grid grid-cols-3">
			<FormInputToggle
				class="col-span-full pt-4"
				label="Partager la liste"
				:value="values.shared"
				@change="handleSharedChange"
				inline
				helperText="En activant cette option, votre liste sera visible pour les personnes définies ci-dessous ou celles disposant du lien ou du code de partage."
			/>

			<FormInputText
				class="col-span-1 pt-4"
				label="Ajouter des personnes"
				helperText="Test"
				:disabled="!values.shared"
			/>
			<div class="col-span-full flex items-center">
				<span>Invités :</span>
				<div class="flex py-2 ml-4">
					<PersonTag
						class="ml-2"
						v-for="person in values.authorizedUsers"
						:key="person.id"
						:text="person.name"
						@delete="handleAuthorizedDelete(person.id)"
					/>
				</div>
			</div>
		</div>
		<div class="col-span-full">{{ values }}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FormInputText from "@/components/Inputs/FormInputText.vue";
import FormInputToggle from "@/components/Inputs/FormInputToggle.vue";
import PersonTag from "@/components/Styled/PersonTag.vue";

export default defineComponent({
	name: "NewListStep2",
	props: {
		values: {
			type: Object,
		},
	},
	components: {
		FormInputText,
		FormInputToggle,
		PersonTag,
	},
	setup(props, context) {
		const handleSharedChange = (shared: boolean) => {
			const values = {
				...props.values,
				shared,
			};
			context.emit("change", values);
		};

		const handleOwnersDelete = (id: any) => {
			const owners = [...props.values?.owners];
			owners.splice(
				owners.findIndex((owner) => owner.id === id),
				1
			);
			const values = {
				...props.values,
				owners,
			};
			context.emit("change", values);
		};

		const handleAuthorizedDelete = (id: any) => {
			const authorizedUsers = [...props.values?.authorizedUsers];
			authorizedUsers.splice(
				authorizedUsers.findIndex((user) => user.id === id),
				1
			);
			const values = {
				...props.values,
				authorizedUsers,
			};
			context.emit("change", values);
		};

		return {
			handleSharedChange,
			handleOwnersDelete,
			handleAuthorizedDelete,
		};
	},
	emits: ["change"],
});
</script>
