<template>
    <main>
        <h1>My account</h1>
        <section>
            <h2>{{ name }}</h2>
            <p>{{ $auth.user.email }}</p>
        </section>
    </main>
</template>

<script>
export default {
    computed: {
        name() {
            const firstName = this.$auth.user.firstName;
            const lastName = this.$auth.user.lastName;
            if (firstName && lastName) {
                return `${firstName} ${lastName}`;
            }
            return '';
        },
        email() {
            return this.$auth.user.email || '';
        },
    },
    async mounted() {
        await this.$auth.fetchUser();
    },
};
</script>
