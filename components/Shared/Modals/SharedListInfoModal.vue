<template>
    <Modal @close="$emit('close')">
        <div class="modal__shared-list-info">
            <div class="modal__header">
                <h2>Informations</h2>
                <CloseIcon cursor="pointer" @click="$emit('close')" />
            </div>
            <ul>
                <li><span>Nom</span>: {{ list.name }}</li>
                <li><span>Auteur</span>: {{ list.owner }}</li>
                <li><span>Statut</span>: Publique</li>
                <li><span>Créée le</span>: {{ creationDate }}</li>
                <li><span>Modifiée le</span>: {{ modificationDate }}</li>
            </ul>
            <button class="btn btn-list btn-full" @click="$emit('close')">
                Fermer
            </button>
        </div>
    </Modal>
</template>

<script>
export default {
    props: {
        list: {
            default: () => {},
            type: Object,
        },
    },
    computed: {
        creationDate() {
            const date = new Date(this.list.created_at);
            return `${date
                .getDate()
                .toLocaleString(undefined, { minimumIntegerDigits: 2 })}/${(
                date.getMonth() + 1
            ).toLocaleString(undefined, {
                minimumIntegerDigits: 2,
            })}/${date.getFullYear()} ${date.getHours()}:${date
                .getMinutes()
                .toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
        },
        modificationDate() {
            const date = new Date(this.list.modified_at);
            return `${date
                .getDate()
                .toLocaleString(undefined, { minimumIntegerDigits: 2 })}/${(
                date.getMonth() + 1
            ).toLocaleString(undefined, {
                minimumIntegerDigits: 2,
            })}/${date.getFullYear()} ${date.getHours()}:${date
                .getMinutes()
                .toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
        },
    },
};
</script>
