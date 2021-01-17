<template>
    <main>
        <div class="login lg-container">
            <h1>Login</h1>
            <p>
                Not a user yet ?
                <NuxtLink :to="registerPath">Click here to register</NuxtLink>
            </p>
            <UserForm
                :form-type="'login'"
                :form-method="loginUser"
                :login-error="loginErrorMessage"
                @resetEmail="reset"
                @resetPassword="reset"
            />
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
    data() {
        return {
            loginErrorMessage: '',
        };
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
            const response = await this.$auth.loginWith('local', {
                data: user,
            });
            if (response.data.err) {
                this.loginErrorMessage = response.data.err.message;
            } else {
                this.reset();
                this.$router.push(this.redirectPath);
            }
        },
        reset() {
            this.loginErrorMessage = '';
        },
    },
};
</script>
