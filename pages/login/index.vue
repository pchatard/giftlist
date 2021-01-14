<template>
    <main>
        <div class="login lg-container">
            <h1>Login</h1>
            <p>
                Not a user yet ?
                <NuxtLink :to="registerPath">Click here to register</NuxtLink>
            </p>
            <UserForm :form-type="'login'" :form-method="loginUser" />
        </div>
    </main>
</template>

<script>
export default {
    asyncData({ $auth, redirect }) {
        if ($auth.loggedIn) {
            redirect('/app');
        }
    },
    computed: {
        redirectPath() {
            return this.$route.query.redirect || '/app';
        },
        registerPath() {
            if (this.redirectPath !== '/app') {
                return `/register?redirect=${this.redirectPath}`;
            }
            return '/register';
        },
    },
    methods: {
        async loginUser(user) {
            try {
                await this.$auth.loginWith('local', {
                    data: user,
                });
                this.$router.push(this.redirectPath);
            } catch (error) {}
        },
    },
};
</script>
