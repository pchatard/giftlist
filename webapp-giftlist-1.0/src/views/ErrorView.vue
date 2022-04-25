<template>
	<ErrorLayout back>
		<div
			class="absolute top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center gap-4"
		>
			<ExclamationIcon class="w-1/6 text-red-800" />
			<div>Une erreur est survenue...</div>
			<GiftlistButton btn-style="danger-soft" @click="router.go(-1)">Retour</GiftlistButton>
		</div>
	</ErrorLayout>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";

import router from "@/router";

import ErrorLayout from "@/components/DefaultLayout.vue";
import GiftlistButton from "@/components/GiftlistButton.vue";

import { ExclamationIcon } from "@heroicons/vue/outline";
</script>
