<template>
    <Modal @close="$emit('close')">
        <div class="modal__share-list">
            <div class="modal__header">
                <h2>Share your list</h2>
                <CloseIcon cursor="pointer" @click="$emit('close')" />
            </div>
            <section v-if="code">
                <p class="share-status">
                    This list is currently <strong>public</strong>.
                </p>

                <div class="share-code">
                    <label>
                        Copy and share this code with your friends so they can
                        see your list and choose one of your wishes.
                    </label>
                    <input
                        :id="`input-code-${listId}`"
                        :value="code"
                        type="text"
                        class="ipt"
                        disabled
                    />
                    <button class="btn btn-list btn-full" @click="handleCode">
                        Copy code
                    </button>
                </div>

                <div class="share-link">
                    <p>Or copy and share this link with them directly.</p>
                    <p class="link">
                        {{ link }}
                    </p>

                    <button class="btn btn-list btn-full" @click="handleLink">
                        Copy link
                    </button>

                    <p>Note: They will need an account to see it.</p>
                </div>

                <button class="btn btn-danger btn-full" @click="handlePrivate">
                    Turn list private
                </button>
            </section>

            <section v-else>
                <p>Your list is currently <strong>private</strong>.</p>
                <p>
                    Make it public by clicking the
                    <strong>Share</strong> button.
                </p>
                <button
                    class="btn btn-list btn-full"
                    @click="$emit('generate', listId)"
                >
                    Share
                </button>
            </section>
        </div>
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
