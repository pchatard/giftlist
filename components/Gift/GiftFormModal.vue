<template>
    <Modal @close="$emit('close')">
        <form class="flex flex-col" @submit.prevent="submitNewItem">
            <fieldset>
                <label for="gift-title">Title</label>
                <input id="gift-title" v-model="gift.title" type="text" />
            </fieldset>
            <fieldset>
                <label for="gift-link">Link</label>
                <input id="gift-link" v-model="gift.link" type="url" />
            </fieldset>
            <fieldset>
                <label for="gift-fav">Favorite</label>
                <input id="gift-fav" v-model="gift.favorite" type="checkbox" />
            </fieldset>
            <button type="submit">Create</button>
        </form>
    </Modal>
</template>
<script>
export default {
    data() {
        return {
            gift: {
                title: '',
                link: '',
                // img: '',
                // size: '',
                // details: '',
                favorite: false,
            },
        };
    },
    methods: {
        submitNewItem() {
            this.$emit('create', this.gift);
            this.clearForm();
        },
        clearForm() {
            this.gift.title = '';
            this.gift.link = '';
            this.gift.favorite = false;
        },
    },
};
</script>
