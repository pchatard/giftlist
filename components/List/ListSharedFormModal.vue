<template>
    <Modal @close="$emit('close')">
        <form @submit.prevent="handleSubmit">
            <label>
                Enter the list code:
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
