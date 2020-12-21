<template>
    <main>
        <h1>Login</h1>
        <UserForm :form-type="'login'" :form-method="loginUser" />
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
        async loginUser(user) {
            try {
                await this.$auth.loginWith('local', {
                    data: user,
                });
                this.$router.push('/app');
            } catch (error) {}
        },
    },
};
</script>
