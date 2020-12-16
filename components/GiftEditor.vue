<template>
    <div class="modal">
        <form @submit.prevent="$emit('update', formGift)">
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
            formGift: { ...this.gift },
        };
    },
};
</script>
