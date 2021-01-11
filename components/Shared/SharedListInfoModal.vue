<template>
    <Modal @close="$emit('close')">
        <div class="modal__shared-list-info">
            <div class="modal__header">
                <h2>List Information</h2>
                <CloseIcon cursor="pointer" @close="$emit('close')" />
            </div>
            <ul>
                <li><span>Title</span>: {{ list.name }}</li>
                <li><span>Owner</span>: {{ list.owner }}</li>
                <li><span>Status</span>: Public</li>
                <li><span>Created at</span>: {{ creationDate }}</li>
                <li><span>Modified at</span>: {{ modificationDate }}</li>
            </ul>
            <button class="btn btn-list btn-full" @click="$emit('close')">
                Close
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
