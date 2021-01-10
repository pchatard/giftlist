<template>
    <Modal @close="$emit('close')">
        <div class="">
            <h2>List Information</h2>
            <CloseIcon @click="$emit('close')" />
        </div>
        <ul>
            <li><span>Title</span>: {{ list.name }}</li>
            <li><span>Owner</span>: {{ list.owner }}</li>
            <li><span>Status</span>: Public</li>
            <li><span>Created at</span>: {{ creationDate }}</li>
            <li><span>Modified at</span>: {{ modificationDate }}</li>
            <!-- <li><span>Gifts</span>:</li>
            <li><span>Available Gifts</span>:</li>
            <li><span>Booked Gifts</span>:</li> -->
        </ul>
        <button @click="$emit('close')">Close</button>
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
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date
                .getMinutes()
                .toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
        },
        modificationDate() {
            const date = new Date(this.list.modified_at);
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date
                .getMinutes()
                .toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
        },
    },
};
</script>
