<template>
    <li
        class="gift-preview"
        :class="{ selected }"
        @click="$emit('select', gift.id)"
    >
        <div class="preview">
            <div class="preview__left">
                <font-awesome-icon
                    v-if="gift.favorite"
                    class="heart red"
                    :icon="['fas', 'heart']"
                    @click.stop="$emit('favorite', gift.id, false)"
                />
                <font-awesome-icon
                    v-else
                    class="heart"
                    :icon="['far', 'heart']"
                    @click.stop="$emit('favorite', gift.id, true)"
                />

                <h3>{{ gift.title }}</h3>
            </div>

            <CloseIcon :options="'black'" @click="$emit('remove', gift.id)" />
        </div>
    </li>
</template>

<script>
export default {
    props: {
        gift: {
            default: () => ({}),
            type: Object,
        },
        selected: {
            default: () => false,
            type: Boolean,
        },
    },
};
</script>
