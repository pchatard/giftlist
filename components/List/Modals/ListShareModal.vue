<template>
    <Modal @close="$emit('close')">
        <div class="modal__share-list">
            <div class="modal__header">
                <h2>Partager ma liste</h2>
                <CloseIcon cursor="pointer" @click="$emit('close')" />
            </div>
            <section v-if="isPublic">
                <p class="share-status">
                    Cette liste est actuellement <strong>publique</strong> et
                    partagée avec {{ number }} personne(s).
                </p>
                <p class="share-status">
                    Partagez le code ou le lien suivants avec vos amis.
                </p>

                <div class="share-code">
                    <label for="sharing-code">Code</label>
                    <input
                        type="text"
                        id="sharing-code"
                        v-model="code"
                        disabled
                    />
                </div>

                <div class="share-link">
                    <label for="sharing-code">Lien</label>
                    <input
                        type="text"
                        id="sharing-link"
                        v-model="link"
                        disabled
                    />
                </div>

                <button class="btn btn-danger btn-full" @click="handlePrivate">
                    Rendre la liste privée
                </button>
            </section>

            <section v-else>
                <p>Votre liste est actuellement <strong>privée</strong>.</p>
                <p>
                    Rendez la publique en cliquant sur le bouton
                    <strong>Partager</strong>.
                </p>
                <button
                    class="btn btn-list btn-full"
                    @click="$emit('generate', listId)"
                >
                    Partager
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
        public: {
            default: () => false,
            type: Boolean,
        },
        sharingCode: {
            default: () => '',
            type: String,
        },
        number: {
            default: () => 0,
            type: Number,
        },
    },
    data() {
        return {
            isPublic: this.public,
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
        public(newVal) {
            this.isPublic = newVal;
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
