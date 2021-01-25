<template>
    <form @submit.prevent="submit">
        <div class="form__header">
            <h2>Modifier</h2>
            <CloseIcon @click="handleClose" />
        </div>
        <div class="line-1">
            <div>
                <label for="gift-ipt-editor-title"> Nom </label>
                <input
                    id="gift-ipt-editor-title"
                    v-model="formGift.title"
                    type="text"
                    class="ipt"
                    :class="{ error: errors.title }"
                    @input="clearError('title')"
                />
                <p class="error">{{ errors.title }}</p>
            </div>
            <div>
                <label for="gift-ipt-editor-fav"> Favori </label>
                <input
                    id="gift-ipt-editor-fav"
                    v-model="formGift.favorite"
                    type="checkbox"
                />
            </div>
        </div>

        <div>
            <label for="gift-ipt-editor-link"> Lien (URL) </label>
            <input
                id="gift-ipt-editor-link"
                v-model="formGift.link"
                type="text"
                class="ipt"
                :class="{ error: errors.link }"
                @input="clearError('link')"
            />
            <p class="error">{{ errors.link }}</p>
        </div>

        <div class="line-3">
            <div>
                <label for="gift-ipt-editor-brand"> Marque </label>
                <input
                    id="gift-ipt-editor-brand"
                    v-model="formGift.brand"
                    type="text"
                    class="ipt"
                />
            </div>
            <div>
                <label for="gift-ipt-editor-size"> Taille </label>
                <input
                    id="gift-ipt-editor-size"
                    v-model="formGift.size"
                    type="text"
                    class="ipt"
                />
            </div>

            <div>
                <label for="gift-ipt-editor-color"> Couleur </label>
                <input
                    id="gift-ipt-editor-color"
                    v-model="formGift.color"
                    type="text"
                    class="ipt"
                />
            </div>
        </div>

        <div>
            <label for="gift-ipt-editor-details"> Commentaires </label>
            <input
                id="gift-ipt-editor-details"
                v-model="formGift.details"
                type="text"
                class="ipt"
            />
        </div>

        <button type="submit" class="btn btn-list">Enregistrer</button>
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
            errors: {
                title: '',
                link: '',
            },
        };
    },
    watch: {
        gift(newGift) {
            this.formGift = { ...newGift };
        },
    },
    methods: {
        submit() {
            if (this.formGift.title && this.checkLinkValidity()) {
                this.$emit('update', this.formGift);
                this.clearError();
            } else if (this.formGift.title && !this.checkLinkValidity()) {
                this.errors.link = 'Invalid URL';
            } else {
                this.errors.title = "Title can't be empty";
            }
        },
        clearError(field = '') {
            if (field) {
                this.errors[field] = '';
            } else {
                this.errors = { title: '', link: '' };
            }
        },
        checkLinkValidity() {
            if (this.formGift.link) {
                return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
                    this.formGift.link
                );
            } else {
                return true;
            }
        },
        handleClose() {
            this.$emit('close');
            this.clearError();
        },
    },
};
</script>
