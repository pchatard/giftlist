<template>
    <Bubble class="bubble__share">
        This list is shared with {{ number }} people.
    </Bubble>
</template>

<script>
export default {
    props: {
        number: {
            default: () => 1,
            type: Number,
        },
    },
};
</script>
