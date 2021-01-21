<template>
    <Modal class="options" @close="$emit('close')">
        <div class="modal__list-options">
            <button class="btn btn-list" @click="$emit('info')">
                Information
            </button>
            <!-- <button class="btn-bubble">
            Remove list
        </button> -->
            <button class="btn btn-danger" @click="$emit('close')">
                Cancel
            </button>
        </div>
    </Modal>
</template>
