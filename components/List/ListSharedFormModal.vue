<template>
    <Modal @close="$emit('close')">
        <div class="">
            <h2>Find a friend's list</h2>
            <CloseIcon @click="$emit('close')" />
        </div>
        <form class="" @submit.prevent="handleSubmit">
            <label>
                Enter the list sharing code:
                <input v-model="code" type="text" />
            </label>
            <button type="submit">Submit</button>
        </form>
    </Modal>
</template>

<script>
export default {
    data() {
        return {
            code: '',
        };
    },
    methods: {
        handleSubmit() {
            this.$emit('code', this.code);
            this.$emit('close');
        },
    },
};
</script>
