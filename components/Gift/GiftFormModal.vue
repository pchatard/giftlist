<template>
    <Modal @close="handleClose">
        <div class="modal__new-gift">
            <div class="modal__header">
                <h2>Créer un cadeau</h2>
                <CloseIcon cursor="pointer" @click="handleClose" />
            </div>
            <form @submit.prevent="submitNewItem">
                <div class="line-1">
                    <div class="title">
                        <label for="gift-ipt-creator-title">Nom*</label>
                        <input
                            id="gift-ipt-creator-title"
                            v-model="gift.title"
                            type="text"
                            class="ipt"
                            :class="{ error: errors.title }"
                            @input="clearError('title')"
                        />
                        <p class="error">{{ errors.title }}</p>
                    </div>

                    <div class="favorite">
                        <label for="gift-ipt-creator-fav">Favori</label>
                        <input
                            id="gift-ipt-creator-fav"
                            v-model="gift.favorite"
                            type="checkbox"
                        />
                    </div>
                </div>

                <div>
                    <label for="gift-ipt-creator-link">Lien (URL)</label>
                    <input
                        id="gift-ipt-creator-link"
                        v-model="gift.link"
                        type="text"
                        class="ipt"
                        :class="{ error: errors.link }"
                        @input="clearError('link')"
                    />
                    <p class="error">{{ errors.link }}</p>
                </div>

                <div class="line-3">
                    <div>
                        <label for="gift-ipt-creator-brand">Marque</label>
                        <input
                            id="gift-ipt-creator-brand"
                            v-model="gift.brand"
                            type="text"
                            class="ipt"
                        />
                    </div>
                    <div>
                        <label for="gift-ipt-creator-size">Taille</label>
                        <input
                            id="gift-ipt-creator-size"
                            v-model="gift.size"
                            type="text"
                            class="ipt"
                        />
                    </div>
                    <div>
                        <label for="gift-ipt-creator-color">Couleur</label>
                        <input
                            id="gift-ipt-creator-color"
                            v-model="gift.color"
                            type="text"
                            class="ipt"
                        />
                    </div>
                </div>

                <div>
                    <label for="gift-ipt-creator-details">Commentaires</label>
                    <input
                        id="gift-ipt-creator-details"
                        v-model="gift.details"
                        type="text"
                        class="ipt"
                    />
                </div>

                <button type="submit" class="btn btn-list btn-full">
                    Créer
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
            },
            errors: {
                title: '',
                link: '',
            },
        };
    },
    methods: {
        submitNewItem() {
            if (this.gift.title && this.checkLinkValidity()) {
                this.$emit('create', this.gift);
                this.clearForm();
                this.clearError();
            } else if (this.gift.title && !this.checkLinkValidity()) {
                this.errors.link = 'Lien invalide';
            } else {
                this.errors.title = 'La liste doit avoir un nom';
            }
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
        clearError(field = '') {
            if (field) {
                this.errors[field] = '';
            } else {
                this.errors = { title: '', link: '' };
            }
        },
        checkLinkValidity() {
            if (this.gift.link) {
                return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
                    this.gift.link
                );
            } else {
                return true;
            }
        },
        handleClose() {
            this.$emit('close');
            this.clearError();
            this.clearForm();
        },
    },
};
</script>
