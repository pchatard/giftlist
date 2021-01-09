<template>
    <header>
        <div class="header lg-container">
            <NuxtLink :to="loggedIn ? '/app' : '/'" class="logo">
                GiftList
            </NuxtLink>
            <nav>
                <ul>
                    <li>
                        <NuxtLink v-show="!loggedIn" to="/login">
                            Login
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink v-show="!loggedIn" to="/register">
                            Register
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink v-show="loggedIn" to="/app/profile">
                            <img
                                src="@/assets/images/icons/User.svg"
                                alt="Profile Icon"
                                class="profile-icon"
                            />
                        </NuxtLink>
                    </li>

                    <li
                        v-show="loggedIn"
                        class="cursor-pointer"
                        @click="logout"
                    >
                        Logout
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
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
