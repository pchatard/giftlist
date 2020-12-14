<template>
    <main>
        <section>
            <h2>My Lists</h2>
            <ul>
                <ListPreview
                    v-for="list in lists"
                    :key="list.id"
                    :list="list"
                    @remove="handleRemoveList"
                />
            </ul>
            <form
                v-show="showForm"
                class="border-2 border-black flex flex-col items-start"
                @submit.prevent="createList"
            >
                <label for="new-list">List name</label>
                <input
                    id="new-list"
                    v-model="newListName"
                    type="text"
                    placeholder="Birthday"
                />
                <button type="button" @click="toggleForm">Annuler</button>
                <button type="submit">Create</button>
            </form>
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
    async asyncData({ store }) {
        const lists = await store.dispatch('lists/initialize');
        return { lists };
    },
    data() {
        return {
            showForm: false,
            newListName: '',
        };
    },
    methods: {
        ...mapActions({
            newList: 'lists/createList',
            deleteList: 'lists/deleteList',
        }),
        createList() {
            this.newList(this.newListName);
            this.toggleForm();
        },
        handleRemoveList(listId) {
            this.deleteList(listId);
        },
        toggleForm() {
            this.showForm = !this.showForm;
        },
    },
};
</script>
