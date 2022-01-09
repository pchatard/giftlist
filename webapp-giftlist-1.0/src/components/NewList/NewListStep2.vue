<template>
	<div class="grid grid-cols-3 gap-4 divide-y">
		<div class="col-span-full grid grid-cols-3">
			<FormSelect
				class="col-span-1 py-4"
				label="Propriétaires"
				:value="ownersSelectValue"
				:options="ownersSelectOptions"
				writable
				helperText="Ajouter des propriétaires"
				@change="handleSelectOwner"
			/>
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
				helperText="En activant cette option, votre liste sera visible pour les personnes de votre choix ou celles disposant du lien ou du code de partage."
			/>

			<FormSelect
				v-show="values.shared"
				class="col-span-1 py-4"
				label="Ajouter des personnes"
				helperText="Partager cette liste avec de nouvelles personnes"
				writable
				:disabled="!values.shared"
				:value="authorizedUsersSelectValue"
				:options="authorizedUsersSelectOptions"
				@change="handleSelectAuthorized"
			/>
			<div class="col-span-full flex items-center" v-show="values.shared">
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
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import FormInputToggle from "@/components/Inputs/FormInputToggle.vue";
import FormSelect from "@/components/Inputs/FormSelect.vue";
import PersonTag from "@/components/Styled/PersonTag.vue";

export default defineComponent({
	name: "NewListStep2",
	props: {
		values: {
			type: Object,
		},
	},
	components: {
		FormSelect,
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

		const handleSelectOwner = (selectedOwner: any) => {
			const owners = [...props.values?.owners];
			owners.push(selectedOwner);
			const values = {
				...props.values,
				owners,
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

		const handleSelectAuthorized = (selectedUser: any) => {
			const authorizedUsers = [...props.values?.authorizedUsers];
			authorizedUsers.push(selectedUser);
			const values = {
				...props.values,
				authorizedUsers,
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

		const ownersSelectValue = ref({});
		const ownersSelectOptions = computed(() => {
			return props.values?.friends.filter(
				(friend: any) => props.values?.owners.findIndex((o: any) => o.id === friend.id) < 0
			);
		});

		const authorizedUsersSelectValue = ref({});
		const authorizedUsersSelectOptions = computed(() => {
			// Only keep friends that are not already added or in the owners list.
			return props.values?.friends.filter(
				(friend: any) =>
					props.values?.authorizedUsers.findIndex((au: any) => au.id === friend.id) < 0 &&
					props.values?.owners.findIndex((o: any) => o.id === friend.id) < 0
			);
		});

		return {
			handleSharedChange,
			handleSelectOwner,
			handleOwnersDelete,
			handleSelectAuthorized,
			handleAuthorizedDelete,
			ownersSelectValue,
			ownersSelectOptions,
			authorizedUsersSelectValue,
			authorizedUsersSelectOptions,
		};
	},
	emits: ["change"],
});
</script>
