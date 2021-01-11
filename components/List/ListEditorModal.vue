<template>
    <Modal @close="$emit('close')">
        <div class="modal__edit-list">
            <div class="modal__header">
                <h2>Edit a list</h2>
                <CloseIcon cursor="pointer" @close="$emit('close')" />
            </div>
            <form @submit.prevent="$emit('update', newName)">
                <label for="list-ipt-editor">
                    Edit the name of your list:
                </label>
                <input
                    id="list-ipt-editor"
                    v-model="newName"
                    class="ipt"
                    type="text"
                />
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
    },
    data() {
        return {
            newName: this.listName,
        };
    },
};
</script>
