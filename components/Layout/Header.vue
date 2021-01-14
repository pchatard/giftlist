<template>
    <header>
        <div class="header lg-container">
            <NuxtLink :to="loggedIn ? '/app' : '/'" class="logo">
                GiftList
            </NuxtLink>
            <nav>
                <ul>
                    <li class="text">
                        <NuxtLink v-show="!loggedIn" to="/login">
                            Login
                        </NuxtLink>
                    </li>
                    <li class="text">
                        <NuxtLink v-show="!loggedIn" to="/register">
                            Register
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink v-show="loggedIn" to="/app/profile">
                            <UserIcon
                                :options="'black'"
                                :active="profileActive"
                                @show="toggleUserBubble"
                                @hide="toggleUserBubble"
                            />
                            <HeaderBubble v-show="showUserBubble">
                                Profile
                            </HeaderBubble>
                        </NuxtLink>
                    </li>

                    <li
                        v-show="loggedIn"
                        class="cursor-pointer"
                        @click="logout"
                    >
                        <PowerIcon
                            cursor="pointer"
                            :options="'black'"
                            @show="toggleLogoutBubble"
                            @hide="toggleLogoutBubble"
                        />
                        <HeaderBubble v-show="showLogoutBubble">
                            Logout
                        </HeaderBubble>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            showUserBubble: false,
            showLogoutBubble: false,
        };
    },
    computed: {
        loggedIn() {
            return this.$auth.loggedIn;
        },
        profileActive() {
            return this.$route.name === 'app-profile';
        },
    },
    methods: {
        async logout() {
            await this.$auth.logout();
        },
        toggleUserBubble() {
            this.showUserBubble = !this.showUserBubble;
        },
        toggleLogoutBubble() {
            this.showLogoutBubble = !this.showLogoutBubble;
        },
    },
};
</script>
