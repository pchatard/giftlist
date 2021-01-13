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
                @click.stop="handleBookButton"
            >
                {{ bookButtonText }}
            </button>
            <span v-else-if="shareMode && !bookButtonText">Taken</span>
            <CloseIcon
                v-else
                :options="'black'"
                @click="$emit('remove', gift.id)"
            />
        </div>
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
    computed: {
        userIsBooker() {
            return this.gift.booked === this.$auth.user.id;
        },
        bookButtonText() {
            if (!this.gift.booked) {
                return 'Book';
            } else if (this.userIsBooker) {
                return 'Unbook';
            } else {
                return '';
            }
        },
    },
    methods: {
        handleBookButton() {
            this.$emit('book', {
                giftId: this.gift.id,
                listId: this.gift.listId,
                status: !this.gift.booked,
            });
        },
    },
};
</script>
