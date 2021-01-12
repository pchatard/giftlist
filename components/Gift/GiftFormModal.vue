<template>
    <Modal @close="$emit('close')">
        <div class="modal__new-gift">
            <div class="modal__header">
                <h2>Create a new gift</h2>
                <CloseIcon cursor="pointer" @click="$emit('close')" />
            </div>
            <form @submit.prevent="submitNewItem">
                <div class="form-container">
                    <div class="left">
                        <label for="gift-ipt-creator-title">Title*</label>
                        <input
                            id="gift-ipt-creator-title"
                            v-model="gift.title"
                            type="text"
                            class="ipt"
                        />

                        <label for="gift-ipt-creator-link">Link</label>
                        <input
                            id="gift-ipt-creator-link"
                            v-model="gift.link"
                            type="text"
                            class="ipt"
                        />

                        <div class="favorite">
                            <label for="gift-ipt-creator-fav">Favorite</label>
                            <input
                                id="gift-ipt-creator-fav"
                                v-model="gift.favorite"
                                type="checkbox"
                            />
                        </div>
                    </div>

                    <div class="right">
                        <label for="gift-ipt-creator-brand">Brand</label>
                        <input
                            id="gift-ipt-creator-brand"
                            v-model="gift.brand"
                            type="text"
                            class="ipt"
                        />

                        <label for="gift-ipt-creator-size">Size</label>
                        <input
                            id="gift-ipt-creator-size"
                            v-model="gift.size"
                            type="text"
                            class="ipt"
                        />

                        <label for="gift-ipt-creator-color">Color</label>
                        <input
                            id="gift-ipt-creator-color"
                            v-model="gift.color"
                            type="text"
                            class="ipt"
                        />
                    </div>
                </div>

                <label for="gift-ipt-creator-details">Comments</label>
                <input
                    id="gift-ipt-creator-details"
                    v-model="gift.details"
                    type="text"
                    class="ipt"
                />

                <button type="submit" class="btn btn-list btn-full">
                    Create my gift
                </button>
            </form>
        </div>
    </Modal>
</template>
<script>
export default {
    data() {
        return {
            gift: {
                title: '',
                link: '',
                details: '',
                brand: '',
                size: '',
                color: '',
                favorite: false,
                // img: '',
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
            this.gift.brand = '';
            this.gift.size = '';
            this.gift.details = '';
            this.gift.color = '';
            this.gift.favorite = false;
        },
    },
};
</script>
