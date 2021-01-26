<template>
    <main>
        <div class="list lg-container">
            <div class="list__header">
                <div>
                    <h1>{{ list.name }}</h1>
                    <h2>par {{ list.owner }}</h2>
                </div>
            </div>

            <div class="list__content">
                <section class="gifts">
                    <div class="favorites">
                        <h2>Favoris</h2>
                        <ul v-show="favGifts.length">
                            <GiftPreview
                                v-for="gift in favGifts"
                                :key="gift.id"
                                :gift="gift"
                                :share-mode="true"
                                :selected="selectedGiftId === gift.id"
                                @select="selectGift"
                                @book="handleBookGift"
                            />
                        </ul>
                        <p v-show="!favGifts.length" class="nothing">
                            Pas de favoris
                        </p>
                    </div>
                    <div class="normal">
                        <h2>Wishlist</h2>
                        <ul v-show="otherGifts.length">
                            <GiftPreview
                                v-for="gift in otherGifts"
                                :key="gift.id"
                                :gift="gift"
                                :share-mode="true"
                                :selected="selectedGiftId === gift.id"
                                @select="selectGift"
                                @book="handleBookGift"
                            />
                        </ul>
                        <p v-show="!otherGifts.length" class="nothing">
                            Pas de cadeaux
                        </p>
                    </div>
                    <div class="taken">
                        <h2>Déjà réservés</h2>
                        <ul v-show="takenGifts.length">
                            <GiftPreview
                                v-for="gift in takenGifts"
                                :key="gift.id"
                                :gift="gift"
                                :share-mode="true"
                                :selected="selectedGiftId === gift.id"
                                @select="selectGift"
                                @book="handleBookGift"
                            />
                        </ul>
                        <p v-show="!takenGifts.length" class="nothing">
                            Rien n'est encore réservé.
                        </p>
                    </div>
                </section>

                <div class="vl"></div>

                <section class="editor">
                    <h2 v-if="!selectedGiftId">
                        Sélectionner un cadeau pour voir ses détails
                    </h2>
                    <SharedGiftPreview
                        v-else
                        :gift="selectedGift"
                        @book="handleBookGift"
                    />
                </section>
            </div>

            <GiftDetailsModal
                v-show="selectedGiftId"
                :gift="selectedGift"
                type="details"
                @close="selectGift(selectedGiftId)"
                @book="handleBookGift"
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
            list: {},
            gifts: [],
            selectedGiftId: '',
        };
    },
    computed: {
        favGifts() {
            return this.gifts.filter((gift) => gift.favorite && !gift.booked);
        },
        otherGifts() {
            return this.gifts.filter((gift) => !gift.favorite && !gift.booked);
        },
        takenGifts() {
            return this.gifts.filter((gift) => gift.booked);
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
        const listCode = this.$route.params.code;
        const response = await this.$axios.$get(
            `/api/lists/shared/${listCode}`
        );
        if (response.err) {
            this.$router.push('/app');
        } else {
            this.list = response;
        }

        this.gifts = await this.$store.dispatch(
            'gifts/initialize',
            this.list.id
        );
    },
    methods: {
        ...mapActions({ bookGift: 'gifts/bookGift' }),
        handleBookGift(payload) {
            this.bookGift(payload);
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
