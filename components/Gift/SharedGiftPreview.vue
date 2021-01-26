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
            @click.stop="gift.booked ? handleBookButton() : toggleBookModal()"
        >
            {{ bookButtonText }}
        </button>
        <span v-else-if="gift.booked && !userIsBooker">
            Ce cadeau est réservé par
            {{ gift.booked.name ? gift.booked.name : "quelqu'un d'autre" }}.
        </span>
        <GiftBookModal
            v-show="showBookModal"
            @close="toggleBookModal"
            @book="handleBookButton"
        />
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
            if (this.userIsBooker) {
                return 'Annuler';
            } else {
                return 'Réserver';
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
