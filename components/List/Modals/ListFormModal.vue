<template>
    <Modal @close="$emit('close')">
        <div class="modal__new-list">
            <div class="modal__header">
                <h2>Create a new list</h2>
                <CloseIcon cursor="pointer" @click="$emit('close')" />
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
                />
                <button type="submit" class="btn btn-list btn-full">
                    Create my list
                </button>
            </form>
        </div>
    </Modal>
</template>

<script>
export default {
    data() {
        return {
            newListName: '',
        };
    },
    methods: {
        create() {
            this.$emit('create', this.newListName);
            this.newListName = '';
        },
    },
};
</script>
