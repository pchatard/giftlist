<template>
    <Modal @close="handleClose">
        <div class="modal__new-list">
            <div class="modal__header">
                <h2>Create a new list</h2>
                <CloseIcon cursor="pointer" @click="handleClose" />
            </div>
            <form @submit.prevent="create">
                <label for="list-ipt-creator">
                    Choose a title for your new list
                </label>
                <input
                    id="list-ipt-creator"
                    v-model="newListName"
                    type="text"
                    placeholder="Birthday"
                    class="ipt"
                    :class="{ error: errorMessage }"
                    @input="resetErrorMessage"
                />
                <p class="error">{{ errorMessage }}</p>
                <button type="submit" class="btn btn-list btn-full">
                    Create my list
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
                this.errorMessage = "The name of the list can't be empty";
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
