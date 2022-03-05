import { defineComponent, ref } from 'vue';

import FormInputText from '@/components/Inputs/FormInputText.vue';
import Button from '@/components/Styled/Button.vue';
import DefaultLayout from '@/components/Styled/DefaultLayout.vue';
import Subtitle from '@/components/Styled/Subtitle.vue';
import labels from '@/labels/fr/labels.json';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/outline';

export default defineComponent({
	name: "Friends",
	components: { Button, DefaultLayout, FormInputText, Subtitle, CheckCircleIcon, XCircleIcon },
	setup() {
		const acceptFriendRequest = () => {
			console.log("Friends.vue - acceptFriendRequest");
		};

		const declineFriendRequest = () => {
			console.log("Friends.vue - declineFriendRequest");
		};

		const deleteFriend = () => {
			console.log("Friends.vue - deleteFriend");
		};

		const emailInput = ref({
			label: labels.friends.addFriendsInput.label,
			placeholder: labels.friends.addFriendsInput.placeholder,
			value: "",
			errorMessage: "",
			helperText: labels.friends.addFriendsInput.helperText,
		});

		const handleEmailInputChange = (value: string) => {
			emailInput.value.value = value;
		};

		const sendFriendRequest = () => {
			console.log("Friends.vue - sendFriendRequest");
		};

		const emailInvitationInput = ref({
			label: labels.friends.inviteInput.label,
			placeholder: labels.friends.inviteInput.placeholder,
			value: "",
			errorMessage: "",
			helperText: labels.friends.inviteInput.helperText,
		});

		const handleEmailInvitationInputChange = (value: string) => {
			emailInvitationInput.value.value = value;
		};

		const sendInvitationRequest = () => {
			console.log("Friends.vue - sendInvitationRequest");
		};

		return {
			labels,
			acceptFriendRequest,
			declineFriendRequest,
			deleteFriend,
			emailInput,
			handleEmailInputChange,
			sendFriendRequest,
			emailInvitationInput,
			handleEmailInvitationInputChange,
			sendInvitationRequest,
		};
	},
});
