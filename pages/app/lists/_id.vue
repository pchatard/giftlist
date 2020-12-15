<template>
    <main>
        <h1>{{ list.name }}</h1>
        <section>
            <h2 class="text-red-600">Favorites</h2>
            <ul v-show="favGifts.length">
                <GiftItem
                    v-for="gift in favGifts"
                    :key="gift.id"
                    :gift="gift"
                    @remove="handleRemoveGift"
                    @favorite="handleFavoriteGift"
                >
                    {{ gift.title }}
                </GiftItem>
            </ul>
        </section>
        <section>
            <h2 class="text-red-600">Wishlist</h2>
            <ul v-show="otherGifts.length">
                <GiftItem
                    v-for="gift in otherGifts"
                    :key="gift.id"
                    :gift="gift"
                    @remove="handleRemoveGift"
                    @favorite="handleFavoriteGift"
                >
                    {{ gift.title }}
                </GiftItem>
            </ul>
        </section>

        <!-- Hide when visiting a friend's list -->
        <GiftForm @create="handleCreateGift" />

        <!--
        <section>
            Hide when visiting a friend's list
            <h2>Diffusion</h2>
            Handle diffusion: make it private / public, diffusion link, add user
        </section>
        -->
    </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    // Use this to edit the list quickly, along with contenteditable="true" and @focusout="updateValue"
    data() {
        return {
            pValue: '',
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
        const list = await this.$axios.$get(
            `/api/lists/${this.$route.params.id}`
        );
        const gifts = await this.$store.dispatch('gifts/initialize', list.id);
        this.list = list;
        this.gifts = gifts;
    },
    methods: {
        ...mapActions({
            addGift: 'gifts/addGiftToList',
            favGift: 'gifts/favoritizeGift',
            deleteGift: 'gifts/deleteGift',
        }),
        handleCreateGift(gift) {
            this.addGift({ ...gift, listId: this.list.id });
        },
        handleRemoveGift(giftId) {
            this.deleteGift({ giftId, listId: this.list.id });
        },
        handleFavoriteGift(giftId, newFavoriteState) {
            this.favGift({
                giftId,
                listId: this.list.id,
                newState: newFavoriteState,
            });
        },
        updateValue(e) {
            this.pValue = e.target.textContent;
        },
    },
};
</script>
