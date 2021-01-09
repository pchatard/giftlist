<template>
    <Bubble class="bubble__options">
        <button class="options-btn" @click="$emit('edit')">
            <img src="@/assets/images/icons/Pen.svg" alt="Pen icon" />
            Edit list name
        </button>
        <button class="options-btn" @click="$emit('share')">
            <img src="@/assets/images/icons/Share.svg" alt="Share icon" />
            Share list
        </button>
        <button class="options-btn" @click="$emit('delete')">
            <img src="@/assets/images/icons/Delete.svg" alt="Remove icon" />
            Delete list
        </button>
        <button class="options-btn" @click="$emit('close')">Close</button>
    </Bubble>
</template>
