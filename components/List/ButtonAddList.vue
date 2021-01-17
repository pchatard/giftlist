<template>
    <button @click="$emit('clicked')">
        <PlusIcon />
        <slot />
    </button>
</template>
