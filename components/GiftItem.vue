<template>
    <li class="flex">
        <font-awesome-icon
            v-if="item.favorite"
            :icon="['fas', 'heart']"
            @click="$emit('favorite', item.id, false)"
        />
        <font-awesome-icon
            v-else
            :icon="['far', 'heart']"
            @click="$emit('favorite', item.id, true)"
        />

        <a
            v-if="item.link"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
        >
            {{ item.title }}
        </a>
        <h3 v-else>{{ item.title }}</h3>

        <button @click="$emit('remove', item.id)">Delete</button>
    </li>
</template>

<script>
export default {
    props: {
        item: {
            default: () => ({}),
            type: Object,
        },
    },
};
</script>
