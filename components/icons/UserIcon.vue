<template>
    <svg
        width="51"
        height="54"
        viewBox="0 0 51 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M37.5829 25.5187C34.9851 29.4253 30.5432 32 25.5 32C20.4568 32 16.0149 29.4253 13.4171 25.5187C8.89921 30.3721 6 37.8858 6 46.3197C6 48.9246 6.27656 51.4417 6.79196 53.8197H44.208C44.7234 51.4417 45 48.9246 45 46.3197C45 37.8858 42.1008 30.3721 37.5829 25.5187Z"
            :fill="color"
        />
        <circle cx="6" cy="38" r="5" :fill="color" />
        <circle cx="6" cy="38" r="5.5" stroke="white" stroke-opacity="0.2" />
        <circle cx="45" cy="38" r="5" :fill="color" />
        <circle cx="45" cy="38" r="5.5" stroke="white" stroke-opacity="0.2" />
        <circle cx="25.5" cy="14.5" r="14.5" :fill="color" />
    </svg>
</template>

<script>
export default {
    props: {
        color: {
            default: () => 'black',
            type: String,
        },
    },
};
</script>
