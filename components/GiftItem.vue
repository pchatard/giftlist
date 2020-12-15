<template>
    <li class="flex">
        <font-awesome-icon
            v-if="gift.favorite"
            :icon="['fas', 'heart']"
            @click="$emit('favorite', gift.id, false)"
        />
        <font-awesome-icon
            v-else
            :icon="['far', 'heart']"
            @click="$emit('favorite', gift.id, true)"
        />

        <a
            v-if="gift.link"
            :href="gift.link"
            target="_blank"
            rel="noopener noreferrer"
        >
            {{ gift.title }}
        </a>
        <h3 v-else>{{ gift.title }}</h3>

        <button @click="$emit('remove', gift.id)">Delete</button>
    </li>
</template>

<script>
export default {
    props: {
        gift: {
            default: () => ({}),
            type: Object,
        },
    },
};
</script>
