<template>
    <main>
        <div
            class="container register flex flex-col justify-center items-center"
        >
            <h1 class="form">Register</h1>
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
    auth: false,
    methods: {
        async registerUser(user) {
            try {
                await this.$axios.$post('/api/auth/local/register', user);
                await this.$auth.loginWith('local', {
                    data: user,
                });
                this.$router.push('/app');
            } catch (error) {}
        },
    },
};
</script>

<style lang="postcss">
.register {
    width: 30%;
}
</style>
