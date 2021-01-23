<template>
    <div class="shared-preview">
        <div class="header">
            <div>
                <h2>
                    <font-awesome-icon
                        v-if="gift.favorite"
                        class="heart red"
                        :icon="['fas', 'heart']"
                    />
                    {{ gift.title }}
                </h2>
                <CloseIcon @click="$emit('close')" />
            </div>
            <a v-if="gift.link" :href="gift.link">{{ gift.link }}</a>
        </div>

        <ul>
            <li><span>Brand</span> {{ gift.brand || '-' }}</li>
            <li><span>Size</span> {{ gift.size || '-' }}</li>
            <li><span>Color</span> {{ gift.color || '-' }}</li>
            <li><span>Comments</span> {{ gift.details || '-' }}</li>
        </ul>

        <button
            v-if="!gift.booked || userIsBooker"
            class="btn btn-list"
            :class="{ booked: userIsBooker }"
            @click.stop="handleBookButton"
        >
            {{ bookButtonText }}
        </button>
        <span v-else-if="gift.booked && !userIsBooker">
            This gift is already booked by someone else.
        </span>
    </div>
</template>

<script>
export default {
    props: {
        gift: {
            default: () => ({}),
            type: Object,
        },
    },
    computed: {
        userIsBooker() {
            return this.gift.booked === this.$auth.user.id;
        },
        bookButtonText() {
            if (this.userIsBooker) {
                return 'Unbook';
            } else {
                return 'Book';
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
