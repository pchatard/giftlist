<template>
    <form @submit.prevent="formMethod(formData)">
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
            />
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
};
</script>

<style lang="postcss">
fieldset {
    @apply flex flex-col w-full;
}

input {
    @apply w-full p-2;
}

button.form-btn {
    width: 80%;
    margin: 0.75rem auto;
}
</style>
