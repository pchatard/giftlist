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
            return `${this.$auth.user.firstName} ${this.$auth.user.lastName}`;
        },
    },
};
</script>
