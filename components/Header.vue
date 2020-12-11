<template>
    <header
        class="fixed h-20 w-screen flex justify-between items-center bg-white border-2 border-black p-4"
    >
        <NuxtLink to="/" class="logo"><h1>GiftList</h1></NuxtLink>
        <nav>
            <ul class="flex">
                <li
                    v-for="page in pages"
                    v-show="page.auth === loggedIn"
                    :key="page.name"
                >
                    <NuxtLink :to="page.path">{{ page.name }}</NuxtLink>
                </li>
                <button v-show="this.$auth.loggedIn" @click="logout">
                    Logout
                </button>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        const pages = [
            { path: '/', name: 'Home', auth: false },
            { path: '/app', name: 'Dashboard', auth: true },
            { path: '/app/lists', name: 'Lists', auth: true },
            { path: '/app/profile', name: 'Profile', auth: true },
            { path: '/login', name: 'Login', auth: false },
            { path: '/register', name: 'Register', auth: false },
        ];
        return { pages };
    },
    computed: {
        loggedIn() {
            return this.$auth.loggedIn;
        },
    },
    methods: {
        async logout() {
            await this.$auth.logout();
        },
    },
};
</script>

<style lang="postcss">
nav li a {
    @apply mx-4 py-2;
    border-bottom: 2px solid transparent;
}

nav .nuxt-link-exact-active,
nav ul li:hover a {
    @apply py-2;
    border-bottom: 2px solid red;
}

nav .nuxt-link-exact-active.logo {
    border: none;
}
</style>
