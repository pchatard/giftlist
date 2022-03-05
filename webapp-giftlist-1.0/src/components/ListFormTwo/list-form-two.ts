import { computed, defineComponent, ref } from 'vue';

import InputSelect from '@/components/InputSelect/InputSelect.vue';
import InputToggle from '@/components/InputToggle/InputToggle.vue';
import PersonTag from '@/components/PersonTag/PersonTag.vue';
import labels from '@/labels/fr/labels.json';

export default defineComponent({
	name: "ListFormTwo",
	props: {
		values: {
			type: Object,
		},
	},
	components: {
		InputSelect,
		InputToggle,
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
			const owners = [...props.values?.owners.value];
			const authorizedUsers = [...props.values?.authorizedUsers.value];
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
			const owners = [...props.values?.owners.value];
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
			const authorizedUsers = [...props.values?.authorizedUsers.value];
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
			const authorizedUsers = [...props.values?.authorizedUsers.value];
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
