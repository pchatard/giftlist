<template>
    <div>
        <h1>Shared List</h1>
        <h2>{{ list.name }} - {{ list.owner }}</h2>
        <section>
            <h2 class="text-red-600">Favorites</h2>
            <ul v-show="favGifts.length">
                <SharedGift
                    v-for="gift in favGifts"
                    :key="gift.id"
                    :shared-gift="gift"
                />
            </ul>
        </section>
        <section>
            <h2 class="text-red-600">Wishlist</h2>
            <ul v-show="otherGifts.length">
                <SharedGift
                    v-for="gift in otherGifts"
                    :key="gift.id"
                    :shared-gift="gift"
                />
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
    computed: {
        favGifts() {
            return this.gifts.filter((gift) => gift.favorite);
        },
        otherGifts() {
            return this.gifts.filter((gift) => !gift.favorite);
        },
    },
    async mounted() {
        const listCode = this.$route.params.code;
        this.list = await this.$axios.$get(`/api/lists/shared/${listCode}`);

        this.gifts = await this.$store.dispatch(
            'gifts/initialize',
            this.list.id
        );
    },
};
</script>
