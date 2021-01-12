<template>
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click.stop="$emit('click')"
        @mouseenter="hovered"
        @mouseleave="hovered(false)"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.0139 8.01387C6.91122 9.11655 6.91122 10.9043 8.0139 12.0069L12.0069 16L8.0139 19.9931C6.91122 21.0957 6.91122 22.8835 8.0139 23.9862C9.11654 25.0888 10.9043 25.0888 12.0069 23.9862L16 19.9931L19.9931 23.9862C21.0958 25.0888 22.8835 25.0888 23.9862 23.9862C25.0888 22.8835 25.0888 21.0957 23.9862 19.9931L19.9931 16L23.9862 12.0069C25.0888 10.9043 25.0888 9.11655 23.9862 8.01387C22.8835 6.91123 21.0958 6.91123 19.9931 8.01387L16 12.0069L12.0069 8.01387C10.9043 6.91123 9.11654 6.91123 8.0139 8.01387Z"
            :fill="color"
        />
    </svg>
</template>

<script>
export default {
    props: {
        options: {
            default: () => 'black',
            type: String,
        },
        hover: {
            default: () => true,
            type: Boolean,
        },
    },
    data() {
        return {
            color: this.options,
        };
    },
    methods: {
        hovered(leaving = true) {
            if (this.hover) {
                this.color = leaving ? '#78C3FB' : this.options;
            }
        },
    },
};
</script>
