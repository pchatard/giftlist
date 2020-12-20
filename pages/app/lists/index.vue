<template>
    <main>
        <section>
            <h2>My Lists</h2>
            <ul>
                <ListPreview
                    v-for="list in lists"
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

        <!-- <section>
            <h2>My Friends Lists</h2>
            <ul>
                Change lis into components (ListPreview or else)
                <li>Max's Birthday</li>
                <li>John's Christmas</li>
                <li>Rachel & Eliott's Wedding</li>
            </ul>
            <button>Open a friend's list</button>
        </section> -->
    </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            showForm: false,
            lists: [],
        };
    },
    async mounted() {
        this.lists = await this.$store.dispatch('lists/initialize');
    },
    methods: {
        ...mapActions({
            newList: 'lists/createList',
            shareList: 'lists/shareList',
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
        toggleForm() {
            this.showForm = !this.showForm;
        },
    },
};
</script>
