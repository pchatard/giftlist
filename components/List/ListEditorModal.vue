<template>
    <Modal @close="$emit('close')">
        <div class="">
            <h2>Edit a list</h2>
            <CloseIcon @click="$emit('close')" />
        </div>
        <form class="" @submit.prevent="$emit('update', newName)">
            <label>
                Edit the name of your list:
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
