<template>
    <main>
        <div class="register lg-container">
            <h1>Register</h1>
            <p>
                Already a user ?
                <NuxtLink to="/login">Click here to login</NuxtLink>
            </p>
            <UserForm
                :form-type="'register'"
                :form-method="registerUser"
                :password-error-message="passwordErrorMessage"
                @reset="resetError"
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
            passwordErrorMessage: '',
        };
    },
    methods: {
        async registerUser(user) {
            const response = await this.$axios.$post(
                '/api/auth/local/register',
                user
            );
            if (
                response.err &&
                response.err.name === 'PasswordRequirementsError'
            ) {
                this.passwordErrorMessage = response.err.message;
            } else {
                this.passwordErrorMessage = '';
                await this.$auth.loginWith('local', {
                    data: user,
                });
                const redirect = this.$route.query.redirect || '/app';
                this.$router.push(redirect);
            }
        },
        resetError() {
            this.passwordErrorMessage = '';
        },
    },
};
</script>
