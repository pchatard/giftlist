<template>
    <Modal class="options" @close="$emit('close')">
        <div class="modal__list-options">
            <button class="btn btn-list" @click="$emit('edit')">
                Renommer
            </button>
            <button class="btn btn-list" @click="$emit('share')">
                Partager
            </button>
            <button class="btn btn-list" @click="$emit('delete')">
                Supprimer
            </button>
            <button class="btn btn-danger" @click="$emit('close')">
                Annuler
            </button>
        </div>
    </Modal>
</template>
