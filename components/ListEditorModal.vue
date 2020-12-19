<template>
    <Modal @close="$emit('close')">
        <form
            class="flex flex-col justify-between px-8 py-4"
            @submit.prevent="$emit('update', newName)"
        >
            <label>
                Name
                <input v-model="newName" type="text" />
            </label>
            <button type="submit">Save</button>
        </form>
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
