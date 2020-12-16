<template>
    <li v-if="editMode" class="flex justify-between px-8 py-4 hover:bg-red-500">
        <input v-if="editMode" v-model="listName" type="text" />
        <button @click="updateList">Save</button>
    </li>
    <li v-else class="flex justify-between px-8 py-4 hover:bg-red-500">
        <NuxtLink :to="`/app/lists/${list.id}`">{{ list.name }}</NuxtLink>
        <p>Creation: {{ creationDate }}</p>
        <p>Last modification: {{ modificationDate }}</p>
        <button @click="showEditMode">Update</button>
        <button @click="$emit('remove', list.id)">Delete</button>
    </li>
</template>

<script>
export default {
    props: {
        list: {
            default: () => ({}),
            type: Object,
        },
    },
    data() {
        return {
            editMode: false,
            listName: this.list.name,
        };
    },
    computed: {
        creationDate() {
            const date = new Date(this.list.created_at);
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date
                .getMinutes()
                .toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
        },
        modificationDate() {
            const date = new Date(this.list.modified_at);
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date
                .getMinutes()
                .toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
        },
    },
    methods: {
        showEditMode() {
            this.editMode = true;
        },
        updateList() {
            this.$emit('update', { name: this.listName, id: this.list.id });
            this.editMode = false;
        },
    },
};
</script>
