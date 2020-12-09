<template>
    <main>
        <h1>Login</h1>
        <UserForm :form-type="'login'" :form-method="loginUser" />
    </main>
</template>

<script>
export default {
    methods: {
        loginUser(user) {
            // Call API
        },
    },
};
</script>
