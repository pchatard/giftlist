<template>
	<div class="grid grid-cols-3 gap-4 divide-y">
		<div class="col-span-full grid grid-cols-3">
			<FormSelect
				class="col-span-1 py-4"
				:label="values.owners.label"
				:value="ownersSelectValue"
				:options="ownersSelectOptions"
				writable
				:helperText="values.owners.helperText"
				@change="handleSelectOwner"
			/>
			<div class="col-span-full flex items-center">
				<span>{{ labels.newList.step2.inputs.owners.title }}</span>
				<div class="flex flex-wrap gap-y-2 py-2 ml-4">
					<PersonTag text="Moi" class="px-4" hideDelete />
					<PersonTag
						class="ml-2"
						v-for="owner in values.owners.value"
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
				:label="values.shared.label"
				:value="values.shared.value"
				@change="handleSharedChange"
				inline
				:helperText="values.shared.helperText"
			/>

			<FormSelect
				v-show="values.shared.value"
				class="col-span-1 py-4"
				:label="values.authorizedUsers.label"
				:helperText="values.authorizedUsers.helperText"
				writable
				:disabled="!values.shared.value"
				:value="authorizedUsersSelectValue"
				:options="authorizedUsersSelectOptions"
				@change="handleSelectAuthorized"
			/>
			<div class="col-span-full flex items-center" v-show="values.shared.value">
				<span>{{ labels.newList.step2.inputs.authorizedUsers.title }}</span>
				<div class="flex py-2 ml-4" v-if="values.authorizedUsers.value.length">
					<PersonTag
						class="ml-2"
						v-for="person in values.authorizedUsers.value"
						:key="person.id"
						:text="person.name"
						@delete="handleAuthorizedDelete(person.id)"
					/>
				</div>
				<div v-else class="text-gray-600 ml-2">
					{{ labels.newList.step2.inputs.authorizedUsers.empty }}
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import labels from "@/labels/fr/labels.json";

import FormInputToggle from "@/components/Inputs/FormInputToggle.vue";
import FormSelect from "@/components/Inputs/FormSelect.vue";
import PersonTag from "@/components/Styled/PersonTag.vue";

export default defineComponent({
	name: "ListFormStep2",
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
				shared: {
					...props.values?.shared,
					value: shared,
				},
			};
			context.emit("change", values);
		};

		const handleSelectOwner = (selectedOwner: any) => {
			const owners = [...props.values!.owners.value];
			const authorizedUsers = [...props.values!.authorizedUsers.value];
			owners.push(selectedOwner);
			const selectedOwnerIndex = props.values?.authorizedUsers.value.findIndex(
				(user: any) => user.id === selectedOwner.id
			);
			if (selectedOwnerIndex >= 0) {
				authorizedUsers.splice(selectedOwnerIndex, 1);
			}
			const values = {
				...props.values,
				authorizedUsers: {
					...props.values?.authorizedUsers,
					value: authorizedUsers,
				},
				owners: {
					...props.values?.owners,
					value: owners,
				},
			};
			context.emit("change", values);
		};

		const handleOwnersDelete = (id: any) => {
			const owners = [...props.values!.owners.value];
			owners.splice(
				owners.findIndex((owner) => owner.id === id),
				1
			);
			const values = {
				...props.values,
				owners: {
					...props.values?.owners,
					value: owners,
				},
			};
			ownersSelectValue.value = {};
			context.emit("change", values);
		};

		const handleSelectAuthorized = (selectedUser: any) => {
			const authorizedUsers = [...props.values!.authorizedUsers.value];
			authorizedUsers.push(selectedUser);
			const values = {
				...props.values,
				authorizedUsers: {
					...props.values?.authorizedUsers,
					value: authorizedUsers,
				},
			};
			context.emit("change", values);
		};

		const handleAuthorizedDelete = (id: any) => {
			const authorizedUsers = [...props.values!.authorizedUsers.value];
			authorizedUsers.splice(
				authorizedUsers.findIndex((user) => user.id === id),
				1
			);
			const values = {
				...props.values,
				authorizedUsers: {
					...props.values?.authorizedUsers,
					value: authorizedUsers,
				},
			};
			context.emit("change", values);
		};

		const ownersSelectValue = ref({});
		const ownersSelectOptions = computed(() => {
			return props.values?.friends.filter(
				(friend: any) =>
					props.values?.owners.value.findIndex((o: any) => o.id === friend.id) < 0
			);
		});

		const authorizedUsersSelectValue = ref({});
		const authorizedUsersSelectOptions = computed(() => {
			// Only keep friends that are not already added or in the owners list.
			return props.values?.friends.filter(
				(friend: any) =>
					props.values?.authorizedUsers.value.findIndex((au: any) => au.id === friend.id) <
						0 && props.values?.owners.value.findIndex((o: any) => o.id === friend.id) < 0
			);
		});

		return {
			labels,
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
