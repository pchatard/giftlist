<template>
	<div class="w-full flex flex-row justify-between">
		<router-link to="/">
			<span>Logo</span>
		</router-link>
		<ul class="flex flex-row">
			<li>
				<router-link to="/login">Login</router-link>
			</li>
			<li>
				<router-link to="/register">Register</router-link>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "LoggedOutNavbar",
});
</script>
