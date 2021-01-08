<template>
    <main>
        <div class="container login flex flex-col justify-center items-center">
            <h1 class="form">Login</h1>
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

<style lang="postcss">
.login {
    width: 30%;
}
</style>
