<template>
    <form @submit.prevent="formMethod(formData)">
        <div class="inputs">
            <div v-show="formType === 'register'">
                <label for="first-name">First Name</label>
                <input
                    id="first-name"
                    v-model="formData.firstName"
                    type="text"
                    placeholder="John"
                    class="ipt"
                />
            </div>
            <div v-show="formType === 'register'">
                <label for="last-name">Last Name</label>
                <input
                    id="last-name"
                    v-model="formData.lastName"
                    type="text"
                    placeholder="Doe"
                    class="ipt"
                />
            </div>
            <div>
                <label for="email">E-mail</label>
                <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    placeholder="abcd.efgh@example.com"
                    class="ipt"
                    :class="{ 'ipt-error': emailErrorMessage }"
                    @input="handleResetEmail"
                />
                <p class="error">{{ emailErrorMessage }}</p>
            </div>
            <div>
                <label for="password">Password</label>
                <input
                    id="password"
                    v-model="formData.password"
                    type="password"
                    placeholder="password"
                    class="ipt"
                    :class="{ 'ipt-error': passwordErrorMessage }"
                    @input="handleResetPassword"
                />
                <p class="error">{{ passwordErrorMessage }}</p>
            </div>
            <div v-show="formType === 'register'">
                <label for="password-confirm">Confirm password</label>
                <input
                    id="password-confirm"
                    v-model="formData.passwordConfirmation"
                    type="password"
                    placeholder="password"
                    class="ipt"
                />
            </div>
            <p class="error">{{ loginError }}</p>
            <button type="submit" class="btn btn-list btn-full">
                {{ formType === 'register' ? 'Register' : 'Login' }}
            </button>
        </div>
        <div id="password-checker">
            <PasswordValidator
                v-if="formType === 'register'"
                :passwords="[formData.password, formData.passwordConfirmation]"
            />
        </div>
    </form>
</template>

<script>
export default {
    props: {
        formType: {
            default: () => '',
            type: String,
        },
        formMethod: { default: () => () => {}, type: Function },
        passwordErrorMessage: { default: () => '', type: String },
        emailErrorMessage: { default: () => '', type: String },
        loginError: { default: () => '', type: String },
    },
    data() {
        return {
            formData: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordConfirmation: '',
            },
            passwordValidatorRef: '',
        };
    },
    watch: {
        passwordErrorMessage(error) {
            if (error && window.innerWidth < 600) {
                this.passwordValidatorRef.scrollIntoView();
            }
        },
    },
    mounted() {
        this.passwordValidatorRef = document.querySelector('#password-checker');
    },

    methods: {
        handleResetEmail() {
            if (this.emailErrorMessage || this.loginError) {
                this.$emit('resetEmail');
            }
        },
        handleResetPassword() {
            if (this.passwordErrorMessage || this.loginError) {
                this.$emit('resetPassword');
            }
        },
    },
};
</script>
