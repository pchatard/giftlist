<template>
    <Modal @close="$emit('close')">
        <div class="modal__book-gift">
            <div class="book-header">
                <h1>Réserver</h1>
                <CloseIcon @click="$emit('close')" />
            </div>
            <p>
                Voulez vous que les autres personnes voient que vous avez
                réservé ce cadeau ?
            </p>
            <div class="buttons">
                <button class="btn btn-danger book-btn" @click="$emit('no')">
                    Non
                </button>
                <button class="btn btn-list book-btn" @click="$emit('yes')">
                    Oui
                </button>
            </div>
        </div>
    </Modal>
</template>
