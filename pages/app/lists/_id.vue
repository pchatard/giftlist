<template>
    <main>
        <h1>My Birthday list</h1>
        <section>
            <!-- Hide when visiting a friend's list -->
            <h2>New gift idea</h2>
            <form>
                <!-- Create new entry in the list -->
            </form>
        </section>
        <!-- <section>
            <h2>Favorites</h2>
            <ul>
                <li>iPad Pro</li>
                <li>One Piece</li>
                <li>Roadtrip</li>
            </ul> 
        </section> -->
        <section>
            <h2>Wishlist</h2>
            <ul v-show="items.length">
                <li v-for="item in items" :key="item.id">{{ item.title }}</li>
            </ul>
        </section>
        <section>
            <!-- Hide when visiting a friend's list -->
            <h2>Diffusion</h2>
            <!-- Handle diffusion: make it private / public, diffusion link, add user -->
        </section>
    </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    async asyncData({ params, $axios }) {
        const list = await $axios.$get(`/lists/${params.id}`);
        return {
            listId: params.id,
            list,
        };
    },
    // Use this to edit the list quickly, along with contenteditable="true" and @focusout="updateValue"
    data() {
        return {
            pValue: '',
        };
    },
    computed: {
        items() {
            return this.$store.state.items.items;
        },
    },
    mounted() {
        this.initItems(this.listId);
    },
    methods: {
        ...mapActions({ initItems: 'items/initialize' }),
        updateValue(e) {
            this.pValue = e.target.textContent;
        },
    },
};
</script>
