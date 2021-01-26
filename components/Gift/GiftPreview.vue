<template>
    <li
        class="gift-preview"
        :class="{ selected }"
        @click="$emit('select', gift.id)"
    >
        <div class="preview">
            <div class="preview__left">
                <font-awesome-icon
                    v-if="gift.favorite"
                    class="heart red"
                    :icon="['fas', 'heart']"
                    @click.stop="$emit('favorite', gift.id, false)"
                />
                <font-awesome-icon
                    v-else
                    class="heart"
                    :icon="['far', 'heart']"
                    @click.stop="$emit('favorite', gift.id, true)"
                />

                <h3>{{ gift.title }}</h3>
            </div>

            <button
                v-if="shareMode && bookButtonText"
                class="btn btn-list"
                :class="{ booked: userIsBooker }"
                @click.stop="
                    gift.booked ? handleBookButton() : toggleBookModal()
                "
            >
                {{ bookButtonText }}
            </button>
            <span v-else-if="shareMode && !bookButtonText">Réservé</span>
            <CloseIcon
                v-else
                :options="'black'"
                @click="$emit('remove', gift.id)"
            />
        </div>
        <GiftBookModal
            v-show="showBookModal"
            @close="toggleBookModal"
            @no="handleBookButton(false)"
            @yes="handleBookButton(true)"
        />
    </li>
</template>

<script>
export default {
    props: {
        gift: {
            default: () => ({}),
            type: Object,
        },
        selected: {
            default: () => false,
            type: Boolean,
        },
        shareMode: {
            default: () => false,
            type: Boolean,
        },
    },
    data() {
        return {
            showBookModal: false,
        };
    },
    computed: {
        userIsBooker() {
            const userIsBooker = this.gift.booked
                ? this.gift.booked.id === this.$auth.user.id
                : false;
            return userIsBooker;
        },
        bookButtonText() {
            if (!this.gift.booked) {
                return 'Réserver';
            } else if (this.userIsBooker) {
                return 'Annuler';
            } else {
                return '';
            }
        },
        userName() {
            return `${this.$auth.user.firstName} ${this.$auth.user.lastName}`;
        },
    },
    methods: {
        toggleBookModal() {
            this.showBookModal = !this.showBookModal;
        },
        handleBookButton(showName = false) {
            this.$emit('book', {
                giftId: this.gift.id,
                listId: this.gift.listId,
                status: !this.gift.booked,
                name: showName ? this.userName : undefined,
            });
            if (!this.gift.booked) {
                this.toggleBookModal();
            }
        },
    },
};
</script>
