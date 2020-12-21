<template>
    <div>
        <h1>Shared List</h1>
        <h2>{{ list.name }}</h2>
        <section>
            <ul>
                <li v-for="gift in gifts" :key="gift.id">
                    {{ gift.title }}
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: {},
            gifts: [],
        };
    },
    async mounted() {
        const listCode = this.$route.params.code;
        // Integrate this into the store
        this.list = await this.$axios.$get(`/api/lists/shared/${listCode}`);
        this.gifts = await this.$axios.$get(`/api/gifts/${this.list.id}`);
    },
};
</script>
