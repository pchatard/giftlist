<template>
    <li class="flex justify-between px-8 py-4 hover:bg-red-500">
        <NuxtLink to="">{{ list.name }} (links to the list editor)</NuxtLink>
        <p>Creation: 01/01/2020</p>
        <p>Last modification: 03/01/2020</p>
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
};
</script>
