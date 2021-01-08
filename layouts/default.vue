<template>
    <div>
        <Header />
        <Nuxt />
        <!-- <Footer /> -->
    </div>
</template>

<style lang="postcss">
:root {
    --primary: #749c75;
    --secondary: #3e517a;
    --actions: #ff8811;
    --actions-hover: #ff8811ee;
}

*,
*:after,
*:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    box-sizing: inherit;
}

main {
    @apply p-4 pt-24 h-screen flex justify-center;
}

.container {
    width: 100%;
}

h1 {
    font-weight: bold;
    font-size: 30px;
}

input {
    @apply border-2 rounded p-1 my-2;
    border-color: var(--secondary);
    outline: none;
}

input:focus {
    border-color: var(--actions);
}

button {
    @apply text-white p-2 rounded w-40 block my-2;
    background-color: var(--primary);

    &:hover {
        background-color: var(--actions-hover);
    }
}

.modal-container {
    @apply fixed z-10 top-0 left-0 right-0 bottom-0;
    @apply bg-gray-900 bg-opacity-50;
    @apply grid place-items-center;
}
.modal {
    @apply bg-white;
    @apply w-4/12;
    @apply px-8 py-4;
    @apply shadow-md rounded;
}
</style>
