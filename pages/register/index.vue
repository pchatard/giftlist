<template>
    <main>
        <div class="register lg-container">
            <h1>Inscription</h1>
            <p>
                Déjà inscrit ?
                <NuxtLink to="/login">Cliquez ici pour vous connecter</NuxtLink>
            </p>
            <UserForm
                :form-type="'register'"
                :form-method="registerUser"
                :password-error-message="passwordErrorMessage"
                :email-error-message="emailErrorMessage"
                @resetEmail="resetErrorEmail"
                @resetPassword="resetErrorPassword"
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
            emailErrorMessage: '',
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
            } else if (
                response.err &&
                response.err.name === 'UserAlreadyExistsError'
            ) {
                this.emailErrorMessage = response.err.message;
            } else {
                this.resetErrorEmail();
                this.resetErrorPassword();
                await this.$auth.loginWith('local', {
                    data: user,
                });
                const redirect = this.$route.query.redirect || '/app';
                this.$router.push(redirect);
            }
        },
        resetErrorEmail() {
            this.emailErrorMessage = '';
        },
        resetErrorPassword() {
            this.passwordErrorMessage = '';
        },
    },
};
</script>
