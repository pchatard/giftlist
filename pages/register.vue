<template>
    <main>
        <h1>Register</h1>
        <UserForm :form-type="'register'" :form-method="registerUser" />
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
        async registerUser(user) {
            try {
                await this.$axios.$post('/auth/local/register', user);
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
