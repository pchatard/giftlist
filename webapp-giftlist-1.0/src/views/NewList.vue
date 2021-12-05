<template>
	<DefaultLayout title="Nouvelle liste">
		<Stepper :step="step" :maxSteps="maxStep" />
		<component class="border p-4 my-4 rounded-md" :is="currentComponent" @confirm="skipToList">
		</component>
		<div class="flex justify-between">
			<Button btnStyle="danger" @click="cancel">Annuler</Button>
			<div class="flex gap-4">
				<Button btnStyle="secondary" v-show="step > 1" @click="step--">Précédent</Button>
				<Button btnStyle="primary" @click="nextAction">{{
					step === maxStep ? "Confirmer" : "Suivant"
				}}</Button>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import Button from "@/components/Styled/Button.vue";
import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import NewListStep1 from "@/components/NewList/NewListStep1.vue";
import NewListStep2 from "@/components/NewList/NewListStep2.vue";
import NewListStep3 from "@/components/NewList/NewListStep3.vue";
import Stepper from "@/components/Styled/Stepper.vue";

export default defineComponent({
	name: "NewList",
	components: {
		Button,
		DefaultLayout,
		NewListStep1,
		NewListStep2,
		NewListStep3,
		Stepper,
	},
	setup() {
		const router = useRouter();

		const step = ref(1);
		const maxStep = 3;
		const currentComponent = computed(() => {
			switch (step.value) {
				case 1:
					return "NewListStep1";
				case 2:
					return "NewListStep2";
				case 3:
					return "NewListStep3";
				default:
					return "NewListStep1";
			}
		});

		const cancel = () => {
			router.push("/app/lists");
		};

		const nextAction = () => {
			if (step.value !== maxStep) {
				step.value++;
				return;
			} else {
				// Call Store action
				// Redirect to new list or new gift
				router.push("/app/lists");
			}
		};

		const skipToList = () => {
			// Call Store action
			// Redirect to new list or new gift
			router.push("/app/lists");
		};

		return {
			cancel,
			currentComponent,
			step,
			nextAction,
			maxStep,
			skipToList,
		};
	},
});
</script>
