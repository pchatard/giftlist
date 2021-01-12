<template>
    <form @submit.prevent="$emit('update', formGift)">
        <h2>Edit your gift</h2>
        <div class="line-1">
            <div>
                <label for="gift-ipt-editor-title"> Title </label>
                <input
                    id="gift-ipt-editor-title"
                    v-model="formGift.title"
                    type="text"
                    class="ipt"
                />
            </div>
            <div>
                <label for="gift-ipt-editor-fav"> Favorite </label>
                <input
                    id="gift-ipt-editor-fav"
                    v-model="formGift.favorite"
                    type="checkbox"
                />
            </div>
        </div>

        <div>
            <label for="gift-ipt-editor-link"> Link </label>
            <input
                id="gift-ipt-editor-link"
                v-model="formGift.link"
                type="text"
                class="ipt"
            />
        </div>

        <div class="line-3">
            <div>
                <label for="gift-ipt-editor-brand"> Brand </label>
                <input
                    id="gift-ipt-editor-brand"
                    v-model="formGift.brand"
                    type="text"
                    class="ipt"
                />
            </div>
            <div>
                <label for="gift-ipt-editor-size"> Size </label>
                <input
                    id="gift-ipt-editor-size"
                    v-model="formGift.size"
                    type="text"
                    class="ipt"
                />
            </div>

            <div>
                <label for="gift-ipt-editor-color"> Color </label>
                <input
                    id="gift-ipt-editor-color"
                    v-model="formGift.color"
                    type="text"
                    class="ipt"
                />
            </div>
        </div>

        <div>
            <label for="gift-ipt-editor-details"> Details </label>
            <input
                id="gift-ipt-editor-details"
                v-model="formGift.details"
                type="text"
                class="ipt"
            />
        </div>

        <button type="submit" class="btn btn-list">Save</button>
    </form>
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
    watch: {
        gift(newGift) {
            this.formGift = { ...newGift };
        },
    },
};
</script>
