<template>
	<nav id="nav">
		<router-link to="/">
			<img alt="Vue logo" src="../assets/logo.png" />
		</router-link>
		<ul>
			<li>
				<router-link to="/">Home*</router-link>
			</li>
			<li>
				<router-link to="/login">Login*</router-link>
			</li>
			<li>
				<router-link to="/register">Register*</router-link>
			</li>
			<li>
				<router-link to="/app">Dashboard</router-link>
			</li>
			<li>
				<router-link to="/app/profile">Profile</router-link>
			</li>
			<li>Déconnexion</li>
		</ul>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'NavBar',
});
</script>

<style lang="scss">
#nav {
	display: flex;
	justify-content: space-between;
	align-content: center;
	height: 80px;
	padding: 30px;

	a img {
		height: 100%;
	}

	ul {
		list-style: none;
		display: flex;
		justify-content: center;

		a,
		li {
			font-weight: bold;
			color: #2c3e50;
			text-decoration: none;
			cursor: pointer;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
}
</style>
