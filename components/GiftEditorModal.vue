<template>
    <Modal @close="$emit('close')">
        <form class="flex flex-col" @submit.prevent="$emit('update', formGift)">
            <label>
                Title
                <input
                    id="gift-update-title"
                    v-model="formGift.title"
                    type="text"
                />
            </label>
            <label>
                Link
                <input
                    id="gift-update-link"
                    v-model="formGift.link"
                    type="url"
                />
            </label>
            <label>
                Favorite:
                <input
                    id="gift-update-fav"
                    v-model="formGift.favorite"
                    type="checkbox"
                />
            </label>
            <button type="submit">Save</button>
        </form>
    </Modal>
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
            formGift: { ...this.gift },
        };
    },
};
</script>
