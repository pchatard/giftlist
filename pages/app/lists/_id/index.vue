<template>
    <main>
        <div class="list lg-container">
            <div class="list__header">
                <div class="mine">
                    <h1>{{ list.name }}</h1>
                    <button class="btn btn-list desktop" @click="toggleForm">
                        <PlusIcon />
                        Cadeau
                    </button>
                </div>
                <button class="btn btn-list mobile" @click="toggleForm">
                    <PlusIcon />
                </button>
                <button
                    class="btn"
                    :class="{
                        'btn-list': list.sharingCode,
                        'btn-danger': !list.sharingCode,
                    }"
                    @click="toggleShare"
                >
                    {{ list.sharingCode ? 'Public' : 'Privée' }}
                </button>
            </div>

            <div class="list__content">
                <section class="gifts">
                    <div class="favorites">
                        <h2>Favoris</h2>
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
                        <p v-show="!favGifts.length" class="nothing">
                            Pas encore de favoris.
                        </p>
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
                        <p v-show="!otherGifts.length" class="nothing">
                            Pas encore de cadeaux.
                        </p>
                    </div>
                </section>

                <div class="vl"></div>

                <section class="editor" display="none">
                    <h2 v-if="!selectedGiftId">
                        Sélectionner un cadeau pour le modifier
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
            <GiftDetailsModal
                v-show="selectedGiftId"
                :gift="selectedGift"
                type="edit"
                @update="handleUpdateGift"
                @close="selectGift(selectedGiftId)"
            />
            <ListShareModal
                v-show="showShare"
                :list-id="list.id"
                :sharing-code="list.sharingCode"
                :number="sharedNumber"
                @close="toggleShare"
                @private="handlePrivateList"
                @generate="handleShareList"
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
            showShare: false,
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
        sharedNumber() {
            return this.list.sharedWith ? this.list.sharedWith.length : 0;
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
            shareList: 'lists/shareList',
            makeListPrivate: 'lists/privateList',
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
            this.selectedGiftId = '';
        },
        toggleForm() {
            this.showForm = !this.showForm;
        },
        toggleShare() {
            this.showShare = !this.showShare;
        },
        selectGift(id) {
            if (this.selectedGiftId !== id) {
                this.selectedGiftId = id;
            } else {
                this.selectedGiftId = '';
            }
        },
        async handleShareList(listId) {
            this.list = await this.shareList({ listId, returnLists: false });
        },
        async handlePrivateList(listId) {
            this.list = await this.makeListPrivate({
                listId,
                returnLists: false,
            });
        },
    },
};
</script>
