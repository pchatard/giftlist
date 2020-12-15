<template>
    <main>
        <h1>Register</h1>
        <UserForm :form-type="'register'" :form-method="registerUser" />
    </main>
</template>

<script>
export default {
    asyncData({ $auth, redirect }) {
        if ($auth.loggedIn) {
            redirect('/app');
        }
    },
    auth: false,
    methods: {
        async registerUser(user) {
            try {
                await this.$axios.$post('/api/auth/local/register', user);
                const { data } = await this.$auth.loginWith('local', {
                    data: user,
                });
                this.$auth.setUser(data.user);
                this.$router.push('/app');
            } catch (error) {}
        },
    },
};
</script>
