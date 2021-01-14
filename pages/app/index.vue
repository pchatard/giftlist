<template>
    <main>
        <div class="dashboard lg-container">
            <h1>Welcome, {{ firstName }}!</h1>
            <div class="lists">
                <section class="owner">
                    <div class="section-header">
                        <h2>My Lists</h2>
                        <ButtonAddList
                            class="btn btn-list"
                            @clicked="toggleForm"
                        />
                    </div>
                    <ul>
                        <ListPreview
                            v-for="list in lists.mine"
                            :key="list.id"
                            :list="list"
                            @share="handleShareList"
                            @private="handlePrivateList"
                            @update="handleUpdateList"
                            @remove="handleRemoveList"
                        />
                    </ul>
                    <ListFormModal
                        v-show="showForm"
                        @close="toggleForm"
                        @create="createList"
                    />
                </section>
                <section class="friends">
                    <div class="section-header">
                        <h2>Friends Lists</h2>
                        <ButtonAddList
                            class="btn btn-list"
                            @clicked="toggleShareForm"
                        />
                    </div>
                    <ul>
                        <SharedListPreview
                            v-for="list in lists.shared"
                            :key="list.id"
                            :shared-list="list"
                        />
                    </ul>
                    <SharedListFormModal
                        v-show="showShareForm"
                        @close="toggleShareForm"
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
            updateList: 'lists/updateList',
            deleteList: 'lists/deleteList',
        }),
        createList(newListName) {
            this.newList(newListName);
            this.toggleForm();
        },
        async handleShareList(listId) {
            this.lists = await this.shareList(listId);
        },
        async handlePrivateList(listId) {
            this.lists = await this.makeListPrivate(listId);
        },
        handleUpdateList(data) {
            this.updateList(data);
        },
        async handleRemoveList(listId) {
            this.lists = await this.deleteList(listId);
        },
        async addSharedList(code) {
            this.lists.shared = await this.getSharedList(code);
        },
        toggleForm() {
            this.showForm = !this.showForm;
        },
        toggleShareForm() {
            this.showShareForm = !this.showShareForm;
        },
    },
};
</script>
