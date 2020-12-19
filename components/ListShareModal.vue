<template>
    <Modal @close="$emit('close')">
        <h1>Share your list</h1>
        <button>Code</button>
        <button>Link</button>
        <section v-show="code">
            <label>
                Give this code to your friends so they can see your list.
                <input v-model="code" type="text" />
            </label>
            <p>
                once they'll have added it to their account, they will be able
                to see your list !
            </p>
        </section>
        <section v-show="link">
            <label>
                Share this link with your friends so they can see your list.
                <input v-model="link" type="url" />
            </label>
            <p>Note: They will need an account to see it.</p>
        </section>
    </Modal>
</template>

<script>
export default {
    data() {
        return {
            code: '',
            link: '',
        };
    },
};
</script>
