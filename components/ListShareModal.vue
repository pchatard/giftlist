<template>
    <Modal @close="$emit('close')">
        <h1>Share your list</h1>

        <section v-if="code">
            <div>
                <label>
                    Give this code to your friends so they can see your list.
                    <input
                        :id="`input-code-${listId}`"
                        :value="code"
                        type="text"
                        disabled
                    />
                </label>
                <p>
                    once they'll have added it to their account, they will be
                    able to see your list !
                </p>
                <button @click="handleCode">Code</button>
            </div>
            <div>
                <label>
                    Share this link with your friends so they can see your list.
                    <input
                        :id="`input-link-${listId}`"
                        :value="link"
                        type="url"
                        disabled
                    />
                </label>
                <p>Note: They will need an account to see it.</p>
                <button @click="handleLink">Link</button>
            </div>
        </section>

        <section v-else>
            This list is currently private. Make it public by generating your
            sharing code and link.
            <button @click="$emit('generate', listId)">Share my list</button>
        </section>
    </Modal>
</template>

<script>
export default {
    props: {
        listId: {
            default: () => '',
            type: String,
        },
        sharingCode: {
            default: () => '',
            type: String,
        },
    },
    data() {
        return {
            code: this.sharingCode,
        };
    },
    computed: {
        link() {
            if (this.code) {
                return `http://localhost:3000/lists/shared/${this.code}`;
            }
            return '';
        },
    },
    watch: {
        sharingCode(newVal) {
            this.code = newVal;
        },
    },

    methods: {
        async handleCode() {
            await this.$copyText(this.code);
            alert('Copied code');
        },
        async handleLink() {
            await this.$copyText(this.link);
            alert('Copied link');
        },
    },
};
</script>
