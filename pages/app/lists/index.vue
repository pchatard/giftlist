<template>
    <main>
        <h1>Lists</h1>
        <section>
            <h2>My Lists</h2>
            <ul>
                <!-- Change lis into components (ListPreview or else), change key to list.id -->
                <li v-for="list in lists" :key="list.name">{{ list.name }}</li>
                <li>Birthday</li>
                <li>Christmas</li>
                <li>Wedding</li>
            </ul>
            <form v-show="showForm">
                <button @click="closeForm">Close</button>
                <label for="new-list">List name</label>
                <input
                    id="new-list"
                    v-model="newListName"
                    type="text"
                    placeholder="Birthday"
                />
            </form>
            <button @click="toggleForm">Create a new list</button>
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
            newListName: '',
        };
    },
    computed: {
        lists() {
            return this.$store.state.lists.lists;
        },
    },
    methods: {
        ...mapActions({ createList: 'lists/createList' }),
        toggleForm() {
            if (this.showForm) {
                this.createList(this.newListName);
                this.showForm = false;
            } else {
                this.showForm = true;
            }
        },
        closeForm() {
            this.showForm = false;
        },
    },
};
</script>
