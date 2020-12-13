<template>
    <li class="flex justify-between px-8 py-4 hover:bg-red-500">
        <NuxtLink :to="`/app/lists/${list.id}`">{{ list.name }}</NuxtLink>
        <p>Creation: {{ creationDate }}</p>
        <p>Last modification: {{ modificationDate }}</p>
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
};
</script>
