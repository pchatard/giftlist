<template>
    <main>
        <div class="profile lg-container">
            <h1>{{ name }}</h1>
            <section>Work in progress</section>
        </div>
    </main>
</template>

<script>
export default {
    middleware: 'redirectMid',
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
