<template>
    <Modal class="options" @close="$emit('close')">
        <div class="modal__list-options">
            <button class="btn btn-list" @click="$emit('edit')">Edit</button>
            <button class="btn btn-list" @click="$emit('share')">Share</button>
            <button class="btn btn-list" @click="$emit('delete')">
                Delete
            </button>
            <button class="btn btn-danger" @click="$emit('close')">
                Cancel
            </button>
        </div>
    </Modal>
</template>
