<template>
    <Modal @close="handleClose">
        <div class="modal__new-list">
            <div class="modal__header">
                <h2>Créer une liste</h2>
                <CloseIcon cursor="pointer" @click="handleClose" />
            </div>
            <form @submit.prevent="create">
                <label for="list-ipt-creator">
                    Choisir un titre pour votre nouvelle liste
                </label>
                <input
                    id="list-ipt-creator"
                    v-model="newListName"
                    type="text"
                    placeholder="ex : Anniversaire, Noël, Naissance..."
                    class="ipt"
                    :class="{ error: errorMessage }"
                    @input="resetErrorMessage"
                />
                <p class="error">{{ errorMessage }}</p>
                <button type="submit" class="btn btn-list btn-full">
                    Créer ma liste
                </button>
            </form>
        </div>
    </Modal>
</template>

<script>
export default {
    props: {
        error: {
            default: () => '',
            type: String,
        },
    },
    data() {
        return {
            newListName: '',
            errorMessage: '',
        };
    },
    watch: {
        error(newError) {
            this.errorMessage = newError;
        },
    },
    methods: {
        create() {
            if (this.checkValidity()) {
                this.$emit('create', this.newListName);
                this.reset();
            } else {
                this.errorMessage =
                    'Le titre de votre liste ne peut pas être vide';
            }
        },
        checkValidity() {
            if (!this.newListName) {
                return false;
            }
            return true;
        },
        reset() {
            this.resetErrorMessage();
            this.resetInput();
        },
        resetErrorMessage() {
            this.errorMessage = '';
            this.$emit('reset');
        },
        resetInput() {
            this.newListName = '';
        },
        handleClose() {
            this.reset();
            this.$emit('close');
        },
    },
};
</script>
