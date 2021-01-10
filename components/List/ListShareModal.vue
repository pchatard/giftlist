<template>
    <Modal @close="$emit('close')">
        <div class="">
            <h2>Share your list</h2>
            <CloseIcon @click="$emit('close')" />
        </div>

        <section v-if="code">
            <p>This list is currently <span class="">public</span></p>
            <div>
                <label>
                    Copy and share this code with your friends so they can see
                    your list and choose one of your wishes.
                    <input
                        :id="`input-code-${listId}`"
                        :value="code"
                        type="text"
                        disabled
                    />
                </label>
                <button @click="handleCode">Copy code</button>
            </div>
            <div>
                <p>Or copy and share this link with them directly.</p>
                <p>
                    {{ link }}
                </p>
                <p>Note: They will need an account to see it.</p>

                <button @click="handleLink">Copy link</button>
            </div>
            <button @click="handlePrivate">Turn list private</button>
        </section>

        <section v-else>
            <p>This list is currently<span>private</span>.</p>
            <p>Make it public by clicking the <span>Share</span> button.</p>
            <button @click="$emit('generate', listId)">Share</button>
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
                return `${process.env.projectUrl}/app/lists/shared/${this.code}`;
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
        },
        async handleLink() {
            await this.$copyText(this.link);
        },
        handlePrivate() {
            this.$emit('private', this.listId);
        },
    },
};
</script>
