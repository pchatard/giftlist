<template>
    <div>
        <Header />
        <Nuxt class="pt-20" />
        <Footer />
    </div>
</template>

<style lang="postcss">
input {
    @apply border-blue-500 border-2 rounded p-1 m-2;
}

button {
    @apply bg-blue-500 text-white p-2 rounded w-48 block m-4;
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
