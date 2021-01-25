<template>
    <header>
        <div class="header lg-container">
            <NuxtLink :to="loggedIn ? '/app' : '/'" class="logo">
                <img src="@/assets/images/LogoSmall.png" alt="Gift Logo" />
                GiftList
            </NuxtLink>

            <nav>
                <ul :class="{ show: showNavbar }">
                    <li v-show="!loggedIn" class="text" @click="toggleNavbar">
                        <NuxtLink to="/"> Accueil </NuxtLink>
                    </li>
                    <li v-show="!loggedIn" class="text" @click="toggleNavbar">
                        <NuxtLink to="/login"> Connexion </NuxtLink>
                    </li>
                    <li v-show="!loggedIn" class="text" @click="toggleNavbar">
                        <NuxtLink to="/register"> Inscription </NuxtLink>
                    </li>
                    <li v-show="loggedIn" @click="toggleNavbar">
                        <NuxtLink to="/app">
                            <HomeIcon :color="homeColor" />
                            <HeaderBubble> Accueil </HeaderBubble>
                        </NuxtLink>
                    </li>

                    <li v-show="loggedIn" @click="toggleNavbar">
                        <NuxtLink to="/app/profile">
                            <UserIcon :color="profileColor" />
                            <HeaderBubble> Profil </HeaderBubble>
                        </NuxtLink>
                    </li>

                    <li
                        v-show="loggedIn"
                        class="cursor-pointer"
                        @click="logout"
                    >
                        <div class="link">
                            <PowerIcon cursor="pointer" :color="'black'" />
                            <HeaderBubble> Déconnexion </HeaderBubble>
                        </div>
                    </li>
                </ul>
            </nav>

            <HamburgerIcon
                :class="{ active: showNavbar }"
                @toggle="toggleNavbar"
            />
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            showNavbar: false,
        };
    },
    computed: {
        loggedIn() {
            return this.$auth.loggedIn;
        },
        homeColor() {
            if (this.$route.name === 'app') {
                return '#78c3fb';
            } else {
                return 'black';
            }
        },
        profileColor() {
            if (this.$route.name === 'app-profile') {
                return '#78c3fb';
            } else {
                return 'black';
            }
        },
    },
    methods: {
        async logout() {
            await this.$auth.logout();
            this.toggleNavbar();
        },
        toggleNavbar() {
            if (window.innerWidth <= 600) {
                this.showNavbar = !this.showNavbar;
            }
        },
    },
};
</script>
