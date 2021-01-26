<template>
    <Modal @close="$emit('close')">
        <div class="modal__book-gift">
            <div class="book-header">
                <h1>Réserver</h1>
                <CloseIcon @click="$emit('close')" />
            </div>
            <p>Voulez vous vraiment réserver ce cadeau ?</p>
            <label for="show-name-ipt">
                <input id="show-name-ipt" v-model="showName" type="checkbox" />
                Montrer aux autres personnes que c'est moi qui ai réservé ce
                cadeau
            </label>
            <div class="buttons">
                <button class="btn btn-danger book-btn" @click="$emit('close')">
                    Annuler
                </button>
                <button
                    class="btn btn-list book-btn"
                    @click="$emit('book', showName)"
                >
                    Réserver
                </button>
            </div>
        </div>
    </Modal>
</template>

<script>
export default {
    data() {
        return {
            showName: true,
        };
    },
};
</script>
