<template>
    <div class="shared-preview">
        <div class="header">
            <h2>
                <font-awesome-icon
                    v-if="gift.favorite"
                    class="heart red"
                    :icon="['fas', 'heart']"
                />
                {{ gift.title }}
            </h2>
            <a v-if="gift.link" :href="gift.link">{{ gift.link }}</a>
        </div>

        <ul>
            <li v-if="gift.brand"><span>Brand</span> {{ gift.brand }}</li>
            <li v-if="gift.size"><span>Size</span> {{ gift.size }}</li>
            <li v-if="gift.color"><span>Color</span> {{ gift.color }}</li>
            <li v-if="gift.details">
                <span>Comments</span> {{ gift.details }}
            </li>
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
