<template>
    <Bubble class="bubble__options">
        <button class="options-btn" @click="$emit('info')">
            <img
                src="@/assets/images/icons/Information.svg"
                alt="Information Icon"
                class="info"
            />
            Information
        </button>
        <button class="options-btn">
            <img src="@/assets/images/icons/Delete.svg" alt="Delete Icon" />
            Remove list
        </button>
        <button class="options-btn" @click="$emit('close')">Close</button>
    </Bubble>
</template>
