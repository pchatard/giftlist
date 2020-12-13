<template>
    <main>
        <h1>{{ list.name }}</h1>
        <section>
            <h2>Favorites</h2>
            <ul v-show="favItems.length">
                <GiftItem
                    v-for="item in favItems"
                    :key="item.id"
                    :item="item"
                    @remove="handleRemoveItem"
                    @favorite="handleFavoriteItem"
                >
                    {{ item.title }}
                </GiftItem>
            </ul>
        </section>
        <section>
            <h2>Wishlist</h2>
            <ul v-show="otherItems.length">
                <GiftItem
                    v-for="item in otherItems"
                    :key="item.id"
                    :item="item"
                    @remove="handleRemoveItem"
                    @favorite="handleFavoriteItem"
                >
                    {{ item.title }}
                </GiftItem>
            </ul>
        </section>

        <!-- 
        Hide when visiting a friend's list
        <ItemForm />
        <section>
            <h2>New gift idea</h2>
            <form>
                Create new entry in the list
            </form>
        </section>
        -->

        <!--
        <section>
            Hide when visiting a friend's list
            <h2>Diffusion</h2>
            Handle diffusion: make it private / public, diffusion link, add user
        </section>
        -->
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
            return this.$store.state.items.items || [];
        },
        favItems() {
            return this.items.filter((item) => item.favorite);
        },
        otherItems() {
            return this.items.filter((item) => !item.favorite);
        },
    },
    mounted() {
        this.initItems(this.listId);
    },
    methods: {
        ...mapActions({
            initItems: 'items/initialize',
            favItem: 'items/favoritizeItem',
            deleteItem: 'items/deleteItem',
            addItem: 'items/addItemToList',
        }),
        createItem(item) {
            this.addItem(item);
        },
        handleRemoveItem(itemId) {
            this.deleteItem(itemId);
        },
        handleFavoriteItem(itemId, newFavoriteState) {
            this.favItem({ itemId, newState: newFavoriteState });
        },
        updateValue(e) {
            this.pValue = e.target.textContent;
        },
    },
};
</script>
