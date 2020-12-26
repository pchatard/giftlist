<template>
    <li
        class="flex items-center justify-between border border-black rounded m-2"
    >
        <div class="title flex">
            <!-- Favorite icon if gift in favorites -->
            <font-awesome-icon
                v-if="sharedGift.favorite"
                class="text-red-600"
                :icon="['fas', 'heart']"
            />

            <!-- Links to the gift if link given or simply displays the title -->
            <a
                v-if="sharedGift.link"
                :href="sharedGift.link"
                target="_blank"
                rel="noopener noreferrer"
            >
                {{ sharedGift.title }}
            </a>
            <h3 v-else>{{ sharedGift.title }}</h3>
        </div>

        <!-- Buttons: More info (sizes), Book -->
        <div class="actions flex">
            <button>More info</button>
            <button
                v-show="!sharedGift.booked"
                @click="
                    $emit('book', {
                        giftId: sharedGift.id,
                        listId: sharedGift.listId,
                        status: true,
                    })
                "
            >
                I take this!
            </button>
            <button
                v-show="userIsBooker"
                @click="
                    $emit('book', {
                        giftId: sharedGift.id,
                        listId: sharedGift.listId,
                        status: false,
                    })
                "
            >
                Unbook
            </button>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        sharedGift: {
            default: () => ({}),
            type: Object,
        },
    },
    computed: {
        userIsBooker() {
            return this.sharedGift.booked === this.$auth.user.id;
        },
    },
};
</script>
