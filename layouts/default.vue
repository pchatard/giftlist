<template>
    <div>
        <Header />
        <Nuxt class="pt-20" />
        <Footer />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    async mounted() {
        if (this.$auth.loggedIn) {
            await this.initLists();
        }
    },
    methods: {
        ...mapActions({ initLists: 'lists/initialize' }),
    },
};
</script>
