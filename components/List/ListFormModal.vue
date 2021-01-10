<template>
    <Modal @close="$emit('close')">
        <div class="">
            <h2>Create a new list</h2>
            <CloseIcon @click="$emit('close')" />
        </div>
        <form class="" @submit.prevent="create">
            <label for="new-list">Choose a title for your new list</label>
            <input
                id="new-list"
                v-model="newListName"
                type="text"
                placeholder="Birthday"
            />
            <button type="submit">Create</button>
        </form>
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
