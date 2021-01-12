<template>
    <Bubble class="bubble__options">
        <button class="btn-bubble" @click="$emit('edit')">
            <PenIcon />
            Edit list name
        </button>
        <button class="btn-bubble" @click="$emit('share')">
            <img src="@/assets/images/icons/Share.svg" alt="Share icon" />
            Share list
        </button>
        <button class="btn-bubble" @click="$emit('delete')">
            <CloseIcon :options="'white'" :hover="false" />
            <!-- <img src="@/assets/images/icons/Delete.svg" alt="Remove icon" /> -->
            Delete list
        </button>
        <button class="btn-bubble" @click="$emit('close')">Close</button>
    </Bubble>
</template>
