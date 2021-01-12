<template>
    <Modal @close="$emit('close')">
        <div class="modal__shared-new-list">
            <div class="modal__header">
                <h2>Find a friend's list</h2>
                <CloseIcon cursor="pointer" @click="$emit('close')" />
            </div>
            <form @submit.prevent="handleSubmit">
                <label for="shared-list-ipt-creator">
                    Enter the list sharing code:
                </label>
                <input
                    id="shared-list-ipt-creator"
                    v-model="code"
                    type="text"
                    class="ipt"
                />
                <button class="btn btn-full btn-list" type="submit">
                    Submit code
                </button>
            </form>
        </div>
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
