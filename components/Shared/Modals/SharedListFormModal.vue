<template>
    <Modal @close="handleClose">
        <div class="modal__shared-new-list">
            <div class="modal__header">
                <h2>Ajouter une liste partagée</h2>
                <CloseIcon cursor="pointer" @click="handleClose" />
            </div>
            <form @submit.prevent="handleSubmit">
                <label for="shared-list-ipt-creator">
                    Entrer le code de partage :
                </label>
                <input
                    id="shared-list-ipt-creator"
                    v-model="code"
                    type="text"
                    class="ipt"
                    :class="{ error: errorMessage }"
                    @input="resetErrorMessage"
                />
                <p class="error">{{ errorMessage }}</p>
                <button class="btn btn-full btn-list" type="submit">
                    Confirmer
                </button>
            </form>
        </div>
    </Modal>
</template>

<script>
export default {
    props: {
        codeError: {
            default: () => '',
            type: String,
        },
    },
    data() {
        return {
            code: '',
            errorMessage: '',
        };
    },
    watch: {
        codeError(newCodeError) {
            this.errorMessage = newCodeError;
        },
    },
    methods: {
        handleSubmit() {
            this.$emit('code', this.code);
            this.reset();
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
            this.code = '';
        },
        handleClose() {
            this.reset();
            this.$emit('close');
        },
    },
};
</script>
