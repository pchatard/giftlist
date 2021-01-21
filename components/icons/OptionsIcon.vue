<template>
    <svg
        width="8"
        height="30"
        viewBox="0 0 8 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @mouseenter="hovered"
        @mouseleave="hovered(false)"
        @click="$emit('open')"
    >
        <g clip-path="url(#clip0)">
            <path
                d="M3.75 7.5C5.82107 7.5 7.5 5.82107 7.5 3.75C7.5 1.67893 5.82107 0 3.75 0C1.67893 0 0 1.67893 0 3.75C0 5.82107 1.67893 7.5 3.75 7.5Z"
                :fill="color"
            />
            <path
                d="M3.75 30C5.82107 30 7.5 28.3211 7.5 26.25C7.5 24.1789 5.82107 22.5 3.75 22.5C1.67893 22.5 0 24.1789 0 26.25C0 28.3211 1.67893 30 3.75 30Z"
                :fill="color"
            />
            <path
                d="M3.75 18.75C5.82107 18.75 7.5 17.0711 7.5 15C7.5 12.9289 5.82107 11.25 3.75 11.25C1.67893 11.25 0 12.9289 0 15C0 17.0711 1.67893 18.75 3.75 18.75Z"
                :fill="color"
            />
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="7.5" height="30" fill="white" />
            </clipPath>
        </defs>
    </svg>
</template>

<script>
export default {
    props: {
        options: {
            default: () => 'white',
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
            if (window.innerWidth > 900) {
                this.color = leaving ? '#78C3FB' : this.options;
            }
        },
    },
};
</script>
