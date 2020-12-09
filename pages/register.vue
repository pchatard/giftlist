<template>
    <main>
        <h1>Register</h1>
        <UserForm :form-type="'register'" :form-method="registerUser" />
    </main>
</template>

<script>
export default {
    methods: {
        registerUser(user) {
            // Call API
        },
    },
};
</script>
