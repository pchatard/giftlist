<template>
	<div class="grid grid-cols-3 gap-4 divide-y">
		<div class="col-span-full grid grid-cols-3">
			<InputSelect
				class="col-span-1 py-4"
				:label="values.owners.label"
				:value="ownersSelectValue"
				:options="ownersSelectOptions"
				writable
				:helper-text="values.owners.helperText"
				disabled
				@change="handleSelectOwner"
			/>
			<div class="col-span-full flex items-center">
				<UserIcon v-if="values.owners.value.length <= 1" class="w-4 h-4 mr-2 text-indigo-600" />
				<UsersIcon v-else class="w-4 h-4 mr-2 text-indigo-600" />
				<span>{{ labels.newList.step2.inputs.owners.title }}</span>
				<div class="flex flex-wrap gap-y-2 py-2 ml-4">
					<PersonTag text="Moi" class="px-4" hide-delete />
					<PersonTag
						v-for="owner in values.owners.value"
						:key="owner.id"
						class="ml-2"
						:text="owner.name"
						@delete="handleOwnersDelete(owner.id)"
					/>
				</div>
			</div>
		</div>

		<div class="col-span-full grid grid-cols-3">
			<InputToggle
				class="col-span-full pt-4"
				:label="values.shared.label"
				:value="values.shared.value"
				inline
				:helper-text="values.shared.helperText"
				@change="handleSharedChange"
			>
				<div class="mr-4">
					<ShareIcon
						class="w-5 h-5"
						:class="values.shared.value ? 'text-indigo-600' : 'text-gray-600'"
					/>
				</div>
			</InputToggle>

			<InputSelect
				v-show="values.shared.value"
				class="col-span-1 py-4"
				:label="values.authorizedUsers.label"
				:helper-text="values.authorizedUsers.helperText"
				writable
				:disabled="true || !values.shared.value"
				:value="authorizedUsersSelectValue"
				:options="authorizedUsersSelectOptions"
				@change="handleSelectAuthorized"
			/>
			<div v-show="values.shared.value" class="col-span-full flex items-center">
				<UserIcon v-if="values.owners.value.length <= 1" class="w-4 h-4 mr-2 text-indigo-600" />
				<UsersIcon v-else class="w-4 h-4 mr-2 text-indigo-600" />
				<span>{{ labels.newList.step2.inputs.authorizedUsers.title }}</span>
				<div v-if="values.authorizedUsers.value.length" class="flex py-2 ml-4">
					<PersonTag
						v-for="person in values.authorizedUsers.value"
						:key="person.id"
						class="ml-2"
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

<script setup lang="ts">
import { computed, ref } from "vue";

import labels from "@/labels/fr/labels.json";

import InputSelect from "@/components/InputSelect.vue";
import InputToggle from "@/components/InputToggle.vue";
import PersonTag from "@/components/PersonTag.vue";
import { ShareIcon, UserIcon, UsersIcon } from "@heroicons/vue/outline";

interface Props {
	values: Record<string, unknown>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "change", values: Record<string, unknown>): void;
}>();

const ownersSelectValue = ref({});
const ownersSelectOptions = computed(() => {
	return props.values?.friends.filter(
		(friend) => props.values?.owners.value.findIndex((o) => o.id === friend.id) < 0
	);
});

const authorizedUsersSelectValue = ref({});
const authorizedUsersSelectOptions = computed(() => {
	// Only keep friends that are not already added or in the owners list.
	return props.values?.friends.filter(
		(friend) =>
			props.values?.authorizedUsers.value.findIndex((au) => au.id === friend.id) < 0 &&
			props.values?.owners.value.findIndex((o) => o.id === friend.id) < 0
	);
});

const handleSharedChange = (shared: boolean) => {
	const values = {
		...props.values,
		shared: {
			...props.values?.shared,
			value: shared,
		},
	};
	emit("change", values);
};

const handleSelectOwner = (selectedOwner: Record<string, unknown>) => {
	const owners = [...props.values.owners.value];
	const authorizedUsers = [...props.values.authorizedUsers.value];
	owners.push(selectedOwner);
	const selectedOwnerIndex = props.values?.authorizedUsers.value.findIndex(
		(user) => user.id === selectedOwner.id
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
	emit("change", values);
};

const handleOwnersDelete = (id: string) => {
	const owners = [...props.values.owners.value];
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
	emit("change", values);
};

const handleSelectAuthorized = (selectedUser) => {
	const authorizedUsers = [...props.values.authorizedUsers.value];
	authorizedUsers.push(selectedUser);
	const values = {
		...props.values,
		authorizedUsers: {
			...props.values?.authorizedUsers,
			value: authorizedUsers,
		},
	};
	emit("change", values);
};

const handleAuthorizedDelete = (id: string) => {
	const authorizedUsers = [...props.values.authorizedUsers.value];
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
	emit("change", values);
};
</script>
