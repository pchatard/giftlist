<template>
    <li class="flex justify-between px-8 py-4 hover:bg-red-500">
        <NuxtLink :to="`/app/lists/${list.id}`">{{ list.name }}</NuxtLink>
        <div>
            <p>Creation: {{ creationDate }}</p>
            <p>Last modification: {{ modificationDate }}</p>
        </div>
        <button @click="toggleSharingMode">Share</button>
        <button @click="toggleEditMode">Update</button>
        <button @click="$emit('remove', list.id)">Delete</button>

        <ListEditorModal
            v-show="editMode"
            :list-name="list.name"
            @close="toggleEditMode"
            @update="updateList"
        />
        <ListShareModal v-show="sharingMode" @close="toggleSharingMode" />
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
            sharingMode: false,
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
        toggleEditMode() {
            this.editMode = !this.editMode;
        },
        updateList(newName) {
            this.$emit('update', { name: newName, id: this.list.id });
            this.toggleEditMode();
        },
        toggleSharingMode() {
            this.sharingMode = !this.sharingMode;
        },
    },
};
</script>
