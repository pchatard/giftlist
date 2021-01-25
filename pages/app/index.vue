<template>
    <main>
        <div class="dashboard lg-container">
            <h1>Bienvenue {{ firstName }} !</h1>
            <div class="lists">
                <section class="owner">
                    <div class="section-header">
                        <h2>Mes listes</h2>
                        <ButtonAddList
                            class="btn btn-list"
                            @clicked="toggleForm"
                        >
                            Liste
                        </ButtonAddList>
                    </div>
                    <ul v-if="lists.mine.length">
                        <ListPreview
                            v-for="list in lists.mine"
                            :key="list.id"
                            :list="list"
                            @share="handleShareList"
                            @private="handlePrivateList"
                            @remove="handleRemoveList"
                        />
                        <div class="spacer"></div>
                    </ul>
                    <p v-else class="nothing">Pas encore de liste.</p>
                    <ListFormModal
                        v-show="showForm"
                        :error="errors.list"
                        @reset="resetError('list')"
                        @close="toggleForm"
                        @create="createList"
                    />
                </section>
                <section class="friends">
                    <div class="section-header">
                        <h2>Listes partagées</h2>
                        <ButtonAddList
                            class="btn btn-list"
                            @clicked="toggleShareForm"
                        >
                            Code
                        </ButtonAddList>
                    </div>
                    <ul v-if="lists.shared.length">
                        <SharedListPreview
                            v-for="list in lists.shared"
                            :key="list.id"
                            :shared-list="list"
                        />
                        <div class="spacer"></div>
                    </ul>
                    <p v-else class="nothing">Pas encore de liste.</p>
                    <SharedListFormModal
                        v-show="showShareForm"
                        :code-error="errors.sharedList"
                        @close="toggleShareForm"
                        @reset="resetError('sharedList')"
                        @code="addSharedList"
                    />
                </section>
            </div>
        </div>
    </main>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    middleware: 'redirectMid',
    data() {
        return {
            showForm: false,
            showShareForm: false,
            lists: { mine: [], shared: [] },
            errors: {
                list: '',
                sharedList: '',
            },
        };
    },
    computed: {
        firstName() {
            return this.$auth.user.firstName;
        },
    },
    async mounted() {
        this.lists = await this.$store.dispatch('lists/initialize');
    },
    methods: {
        ...mapActions({
            newList: 'lists/createList',
            shareList: 'lists/shareList',
            makeListPrivate: 'lists/privateList',
            getSharedList: 'lists/getSharedList',
            deleteList: 'lists/deleteList',
        }),
        async createList(newListName) {
            const error = await this.newList(newListName);
            if (error) {
                this.errors.list = error;
            } else {
                this.resetError('list');
                this.toggleForm();
            }
        },
        async handleShareList(listId) {
            this.lists = await this.shareList({ listId });
        },
        async handlePrivateList(listId) {
            this.lists = await this.makeListPrivate({ listId });
        },
        async handleRemoveList(listId) {
            this.lists = await this.deleteList(listId);
        },
        async addSharedList(code) {
            const error = await this.getSharedList(code);
            if (error) {
                this.errors.sharedList = error;
            } else {
                this.resetError('sharedList');
                this.toggleShareForm();
            }
        },
        toggleForm() {
            this.showForm = !this.showForm;
        },
        toggleShareForm() {
            this.showShareForm = !this.showShareForm;
        },
        resetError(type) {
            this.errors[type] = '';
        },
    },
};
</script>
