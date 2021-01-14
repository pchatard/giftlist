<template>
    <main>
        <div class="list lg-container">
            <div class="list__header">
                <h1>{{ list.name }}</h1>
                <button class="btn btn-list" @click="toggleForm">
                    New gift
                </button>
            </div>

            <div class="list__content">
                <section class="gifts">
                    <div class="favorites">
                        <h2>Favorite gifts</h2>
                        <ul v-show="favGifts.length">
                            <GiftPreview
                                v-for="gift in favGifts"
                                :key="gift.id"
                                :selected="selectedGiftId === gift.id"
                                :gift="gift"
                                @select="selectGift"
                                @update="handleUpdateGift"
                                @remove="handleRemoveGift"
                                @favorite="handleFavoriteGift"
                            />
                        </ul>
                    </div>

                    <div class="normal">
                        <h2>Wishlist</h2>
                        <ul v-show="otherGifts.length">
                            <GiftPreview
                                v-for="gift in otherGifts"
                                :key="gift.id"
                                :gift="gift"
                                :selected="selectedGiftId === gift.id"
                                @select="selectGift"
                                @update="handleUpdateGift"
                                @remove="handleRemoveGift"
                                @favorite="handleFavoriteGift"
                            />
                        </ul>
                    </div>
                </section>

                <div class="vl"></div>

                <section class="editor">
                    <h2 v-if="!selectedGiftId">
                        Select a gift to update its details
                    </h2>
                    <GiftEditor
                        v-else
                        :gift="selectedGift"
                        @update="handleUpdateGift"
                    />
                </section>
            </div>

            <GiftFormModal
                v-show="showForm"
                @close="toggleForm"
                @create="handleCreateGift"
            />
        </div>
    </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    middleware: 'redirectMid',
    data() {
        return {
            showForm: false,
            list: {},
            gifts: [],
            selectedGiftId: '',
        };
    },
    computed: {
        favGifts() {
            return this.gifts.filter((gift) => gift.favorite);
        },
        otherGifts() {
            return this.gifts.filter((gift) => !gift.favorite);
        },
        selectedGift() {
            if (this.selectedGiftId) {
                return this.gifts.find(
                    (gift) => gift.id === this.selectedGiftId
                );
            } else {
                return {};
            }
        },
    },
    async mounted() {
        const list = await this.$axios.$get(
            `/api/lists/${this.$route.params.id}`
        );
        this.list = list;
        const gifts = await this.$store.dispatch(
            'gifts/initialize',
            this.list.id
        );
        this.gifts = gifts;
    },
    methods: {
        ...mapActions({
            addGift: 'gifts/addGiftToList',
            favGift: 'gifts/favoritizeGift',
            updateGift: 'gifts/updateGift',
            deleteGift: 'gifts/deleteGift',
        }),
        handleCreateGift(gift) {
            this.addGift({ ...gift, listId: this.list.id });
            this.toggleForm();
        },
        handleRemoveGift(giftId) {
            this.deleteGift({ giftId, listId: this.list.id });
            if (this.selectedGiftId === giftId) {
                this.selectedGiftId = '';
            }
        },
        handleFavoriteGift(giftId, newFavoriteState) {
            this.favGift({
                giftId,
                listId: this.list.id,
                newState: newFavoriteState,
            });
        },
        handleUpdateGift(updatedGift) {
            this.updateGift(updatedGift);
        },
        toggleForm() {
            this.showForm = !this.showForm;
        },
        selectGift(id) {
            if (this.selectedGiftId !== id) {
                this.selectedGiftId = id;
            } else {
                this.selectedGiftId = '';
            }
        },
    },
};
</script>
