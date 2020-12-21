<template>
    <main>
        <section>
            <h2>My Lists</h2>
            <ul>
                <ListPreview
                    v-for="list in lists.mine"
                    :key="list.id"
                    :list="list"
                    @share="handleShareList"
                    @update="handleUpdateList"
                    @remove="handleRemoveList"
                />
            </ul>
            <ListFormModal
                v-show="showForm"
                @close="toggleForm"
                @create="createList"
            />
            <button @click="toggleForm">Add a new list</button>
        </section>

        <section>
            <h2>My Friends Lists</h2>
            <ul>
                <li v-for="list in lists.shared" :key="list.id">
                    <NuxtLink :to="`/app/lists/shared/${list.sharingCode}`">{{
                        list.name
                    }}</NuxtLink>
                </li>
            </ul>
            <ListSharedFormModal
                v-show="showShareForm"
                @close="toggleShareForm"
                @code="addSharedList"
            />
            <button @click="toggleShareForm">Add a sharing code</button>
        </section>
    </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            showForm: false,
            showShareForm: false,
            lists: { mine: [], shared: [] },
        };
    },
    async mounted() {
        this.lists = await this.$store.dispatch('lists/initialize');
    },
    methods: {
        ...mapActions({
            newList: 'lists/createList',
            shareList: 'lists/shareList',
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
