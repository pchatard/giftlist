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
            <li><span>Marque</span> {{ gift.brand || '-' }}</li>
            <li><span>Taille</span> {{ gift.size || '-' }}</li>
            <li><span>Couleur</span> {{ gift.color || '-' }}</li>
            <li><span>Commentaires</span> {{ gift.details || '-' }}</li>
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
            Ce cadeau est réservé par quelqu'un d'autre.
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
                return 'Annuler';
            } else {
                return 'Réserver';
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
