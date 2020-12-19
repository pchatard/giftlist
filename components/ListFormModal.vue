<template>
    <Modal @close="$emit('close')">
        <form class="flex flex-col items-start" @submit.prevent="create">
            <label for="new-list">List name</label>
            <input
                id="new-list"
                v-model="newListName"
                type="text"
                placeholder="Birthday"
            />
            <button type="button" @click="$emit('close')">Annuler</button>
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
