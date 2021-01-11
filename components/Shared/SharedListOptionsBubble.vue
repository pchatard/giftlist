<template>
    <Bubble class="bubble__options">
        <button class="btn-bubble" @click="$emit('info')">
            <InfoIcon class="info" />
            Information
        </button>
        <button class="btn-bubble">
            <CloseIcon :options="'white'" :hover="false" />
            Remove list
        </button>
        <button class="btn-bubble" @click="$emit('close')">Close</button>
    </Bubble>
</template>
