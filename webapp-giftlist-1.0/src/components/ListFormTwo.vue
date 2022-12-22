<template>
	<div class="grid grid-cols-3 gap-4 divide-y">
		<div class="col-span-full grid grid-cols-3">
			<!-- TODO: Remove disabled when friends will be handled in backend -->
			<InputSelect
				class="col-span-1 py-4"
				:label="listFormData.owners.label"
				:value="ownersSelectValue"
				:options="ownersSelectOptions"
				writable
				:helper-text="listFormData.owners.helperText"
				disabled
				@change="(selectedOwner: Record<string, unknown>) => dispatch('selectListOwner', selectedOwner)"
			/>
			<div class="col-span-full flex items-center">
				<UserIcon
					v-if="listFormData.owners.value.length <= 1"
					class="w-4 h-4 mr-2 text-primary-default"
				/>
				<UsersIcon v-else class="w-4 h-4 mr-2 text-primary-default" />
				<span>{{ labels.newList.step2.inputs.owners.title }}</span>
				<div class="flex flex-wrap gap-y-2 py-2 ml-4">
					<PersonTag text="Moi" class="px-4" hide-delete />
					<PersonTag
						v-for="owner in listFormData.owners.value"
						:key="(owner.id as string)"
						class="ml-2"
						:text="(owner.displayName as string)"
						@delete="handleOwnersDelete(owner.id as string)"
					/>
				</div>
			</div>
		</div>

		<div class="col-span-full grid grid-cols-3">
			<InputToggle
				class="col-span-full pt-4"
				:label="listFormData.isShared.label"
				:value="listFormData.isShared.value"
				inline
				:helper-text="listFormData.isShared.helperText"
				@change="(isShared: boolean) => dispatch('changeListIsShared', isShared)"
			>
				<div class="mr-4">
					<ShareIcon
						class="w-5 h-5"
						:class="
							listFormData.isShared.value ? 'text-primary-default' : 'text-secondary-text'
						"
					/>
				</div>
			</InputToggle>

			<!-- TODO: Remove True in disabled when friends will be handled in backend -->
			<InputSelect
				v-show="listFormData.isShared.value"
				class="col-span-1 py-4"
				:label="listFormData.grantedUsers.label"
				:helper-text="listFormData.grantedUsers.helperText"
				writable
				:disabled="true || !listFormData.isShared.value"
				:value="grantedUsersSelectValue"
				:options="grantedUsersSelectOptions"
				@change="(selectedUser: Record<string, unknown>) => dispatch('selectListGrantedUser', selectedUser)"
			/>
			<div v-show="listFormData.isShared.value" class="col-span-full flex items-center">
				<UserIcon
					v-if="listFormData.owners.value.length <= 1"
					class="w-4 h-4 mr-2 text-primary-default"
				/>
				<UsersIcon v-else class="w-4 h-4 mr-2 text-primary-default" />
				<span>{{ labels.newList.step2.inputs.authorizedUsers.title }}</span>
				<div v-if="listFormData.grantedUsers.value.length" class="flex py-2 ml-4">
					<PersonTag
						v-for="person in listFormData.grantedUsers.value"
						:key="(person.id as string)"
						class="ml-2"
						:text="(person.displayName as string)"
						@delete="() => dispatch('deleteListGrantedUser', person.id as string)"
					/>
				</div>
				<div v-else class="text-secondary-text ml-2">
					{{ labels.newList.step2.inputs.authorizedUsers.empty }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref } from "vue";

import labels from "@/labels/fr/labels.json";

import InputSelect from "@/components/InputSelect.vue";
import InputToggle from "@/components/InputToggle.vue";
import PersonTag from "@/components/PersonTag.vue";
import { ShareIcon, UserIcon, UsersIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex";
import { ListFormState } from "@/store/list-form";

interface Props {
	friends: Record<string, unknown>[];
}

const props = defineProps<Props>();

const { state, dispatch, getters } = useStore();
const listFormData: ComputedRef<ListFormState> = computed(() => state.listForm);

const ownersSelectValue = ref({});
const grantedUsersSelectValue = ref({});

const ownersSelectOptions = computed(() => {
	return props.friends.filter(
		(friend) =>
			getters.getListOwners.findIndex((o: Record<string, unknown>) => o.id === friend.id) < 0
	);
});

const grantedUsersSelectOptions = computed(() => {
	// Only keep friends that are not already added or in the owners list.
	return props.friends.filter(
		(friend) =>
			getters.getListGrantedUsers.findIndex(
				(au: Record<string, unknown>) => au.id === friend.id
			) < 0 &&
			getters.getListOwners.findIndex((o: Record<string, unknown>) => o.id === friend.id) < 0
	);
});

const handleOwnersDelete = (id: string) => {
	dispatch("deleteListOwner", id);
	ownersSelectValue.value = {};
};
</script>
