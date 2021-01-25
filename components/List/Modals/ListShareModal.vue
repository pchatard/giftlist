<template>
    <Modal @close="$emit('close')">
        <div class="modal__share-list">
            <div class="modal__header">
                <h2>Partager ma liste</h2>
                <CloseIcon cursor="pointer" @click="$emit('close')" />
            </div>
            <section v-if="code">
                <p class="share-status">
                    Cette liste est actuellement <strong>publique</strong> et
                    partagée avec {{ number }} personne(s).
                </p>
                <p class="share-status">
                    Partagez le code ou le lien suivants avec vos amis.
                </p>

                <div class="share-code">
                    <button class="btn btn-list btn-full" @click="handleCode">
                        Copier le code
                    </button>
                </div>

                <div class="share-link">
                    <button class="btn btn-list btn-full" @click="handleLink">
                        Copier le lien
                    </button>
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
