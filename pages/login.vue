<template>
    <main>
        <h1>Login</h1>
        <UserForm :form-type="'login'" :form-method="loginUser" />
    </main>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    asyncData({ $auth, redirect }) {
        if ($auth.loggedIn) {
            redirect('/app');
        }
    },
    auth: false,
    methods: {
        ...mapActions({ initLists: 'lists/initialize' }),
        async loginUser(user) {
            try {
                const { data } = await this.$auth.loginWith('local', {
                    data: user,
                });
                this.$auth.setUser(data.user);
                await this.initLists();
                this.$router.push('/app');
            } catch (error) {}
        },
    },
};
</script>
