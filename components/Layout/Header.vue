<template>
    <header
        class="fixed h-20 w-screen flex justify-between items-center bg-white p-4"
    >
        <NuxtLink :to="loggedIn ? '/app' : '/'" class="logo">
            GiftList
        </NuxtLink>
        <nav>
            <ul class="flex">
                <li
                    v-for="page in pages"
                    v-show="page.auth === loggedIn"
                    :key="page.name"
                >
                    <NuxtLink v-if="page.name" :to="page.path">
                        {{ page.name }}
                    </NuxtLink>
                    <NuxtLink v-else :to="page.path">
                        <img
                            src="@/assets/images/icons/User.svg"
                            alt="user icon"
                        />
                    </NuxtLink>
                </li>
                <!-- <li
                    v-show="this.$auth.loggedIn"
                    class="cursor-pointer"
                    @click="logout"
                >
                    Logout
                </li> -->
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        const pages = [
            { path: '/', name: 'Home', auth: false },
            { path: '/login', name: 'Login', auth: false },
            { path: '/register', name: 'Register', auth: false },
            { path: '/app/profile', auth: true },
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
header {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.8);
}

nav li a {
    @apply mx-4 py-2;
    border-bottom: 2px solid transparent;
}

nav .nuxt-link-exact-active,
nav ul li:hover a {
    @apply py-2;
    border-bottom: 2px solid var(--actions);
}

nav .nuxt-link-exact-active.logo {
    border: none;
}
</style>
