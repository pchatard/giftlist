<template>
    <li class="flex items-center border border-black rounded m-2">
        <font-awesome-icon
            v-if="gift.favorite"
            class="text-red-600"
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
        <button @click="toggleEditMode">Modify</button>
        <button @click="$emit('remove', gift.id)">Delete</button>

        <GiftEditorModal
            v-show="editMode"
            :gift="gift"
            @update="updateGift"
            @close="toggleEditMode"
        />
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
    data() {
        return {
            editMode: false,
        };
    },
    methods: {
        toggleEditMode() {
            this.editMode = !this.editMode;
        },
        updateGift(newGift) {
            this.$emit('update', newGift);
            this.toggleEditMode();
        },
    },
};
</script>
