<template>
	<div class="profile">
		<Title>Mon compte</Title>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Title from "@/components/Styled/Title.vue";

export default defineComponent({
	name: "Profile",
	components: { Title },
});
</script>
