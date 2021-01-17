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
                />
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
                    @change="handleReset"
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
            <button type="submit" class="btn btn-list btn-full">
                {{ formType === 'register' ? 'Register' : 'Login' }}
            </button>
        </div>
        <PasswordValidator
            v-if="formType === 'register'"
            :passwords="[formData.password, formData.passwordConfirmation]"
        />
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
        };
    },
    methods: {
        handleReset() {
            if (this.passwordErrorMessage) {
                this.$emit('reset');
            }
        },
    },
};
</script>
