<template>
    <main>
        <div class="register lg-container">
            <h1>Register</h1>
            <p>
                Already a user ?
                <NuxtLink to="/login">Click here to login</NuxtLink>
            </p>
            <UserForm :form-type="'register'" :form-method="registerUser" />
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
    methods: {
        async registerUser(user) {
            try {
                await this.$axios.$post('/api/auth/local/register', user);
                await this.$auth.loginWith('local', {
                    data: user,
                });
                const redirect = this.$route.query.redirect || '/app';
                this.$router.push(redirect);
            } catch (error) {}
        },
    },
};
</script>
