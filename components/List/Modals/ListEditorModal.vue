<template>
    <Modal @close="handleClose">
        <div class="modal__edit-list">
            <div class="modal__header">
                <h2>Edit a list</h2>
                <CloseIcon cursor="pointer" @click="handleClose" />
            </div>
            <form @submit.prevent="update">
                <label for="list-ipt-editor">
                    Edit the name of your list:
                </label>
                <input
                    id="list-ipt-editor"
                    v-model="newName"
                    class="ipt"
                    type="text"
                    :class="{ error: errorMessage }"
                    @input="resetErrorMessage"
                />
                <p class="error">{{ errorMessage }}</p>
                <button type="submit" class="btn btn-list btn-full">
                    Save changes
                </button>
            </form>
        </div>
    </Modal>
</template>

<script>
export default {
    props: {
        listName: {
            default: () => '',
            type: String,
        },
        error: {
            default: () => '',
            type: String,
        },
    },
    data() {
        return {
            newName: this.listName,
            errorMessage: '',
        };
    },
    watch: {
        error(newError) {
            this.errorMessage = newError;
        },
    },
    methods: {
        update() {
            if (this.checkEmptyName()) {
                this.$emit('update', this.newName);
                this.resetErrorMessage();
            } else {
                this.errorMessage = "The name of the list can't be empty";
            }
        },
        checkEmptyName() {
            if (!this.newName) {
                return false;
            }
            return true;
        },
        resetErrorMessage() {
            this.errorMessage = '';
            this.$emit('reset');
        },
        handleClose() {
            this.resetErrorMessage();
            this.newName = this.listName;
            this.$emit('close');
        },
    },
};
</script>
