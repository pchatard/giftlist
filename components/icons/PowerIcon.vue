<template>
    <svg
        width="57"
        height="60"
        viewBox="0 0 57 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @mouseenter="hovered"
        @mouseleave="hovered(false)"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M32 0H24V32H32V0ZM0 31.5C0 19.4679 7.45615 9.17725 18 4.99652V16.2664C13.167 19.604 10 25.1821 10 31.5C10 41.7173 18.2827 50 28.5 50C38.7173 50 47 41.7173 47 31.5C47 24.7561 43.3915 18.855 38 15.6222V4.6217C49.0693 8.53418 57 19.0909 57 31.5C57 47.2401 44.2401 60 28.5 60C12.7599 60 0 47.2401 0 31.5Z"
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
    },
    data() {
        return {
            color: this.options,
        };
    },
    methods: {
        hovered(leaving = true) {
            if (leaving) {
                this.$emit('show');
            } else {
                this.$emit('hide');
            }
            this.color = leaving ? '#78C3FB' : 'black';
        },
    },
};
</script>
