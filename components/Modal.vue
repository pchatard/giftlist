<template>
    <div class="modal-container" @click.self="$emit('close')">
        <div class="modal">
            <slot />
        </div>
    </div>
</template>
