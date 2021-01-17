<template>
    <div>
        <Header />
        <Nuxt />
        <Footer v-if="showFooter" />
    </div>
</template>

<script>
export default {
    middleware: 'showFooter',
    computed: {
        showFooter() {
            return this.$store.state.footer.showFooter;
        },
    },
};
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
</style>
