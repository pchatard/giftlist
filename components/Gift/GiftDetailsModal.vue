<template>
    <Modal class="details" @close="$emit('close')">
        <div v-if="type === 'details'" class="modal__gift-details">
            <SharedGiftPreview
                :gift="gift"
                @book="handleBookButton"
                @close="$emit('close')"
            />
        </div>
        <div v-else-if="type === 'edit'" class="modal__gift-edit">
            <GiftEditor
                :gift="gift"
                @update="handleUpdateGift"
                @close="$emit('close')"
            />
        </div>
    </Modal>
</template>

<script>
export default {
    props: {
        gift: {
            default: () => ({}),
            type: Object,
        },
        type: {
            default: () => 'edit',
            type: String,
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
        handleUpdateGift(payload) {
            this.$emit('update', payload);
        },
    },
};
</script>
