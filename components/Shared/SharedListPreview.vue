<template>
    <li class="flex justify-between items-center px-8 py-4">
        <font-awesome-icon :icon="['fas', 'users']" />
        <NuxtLink :to="`/app/lists/shared/${sharedList.sharingCode}`">{{
            sharedList.name
        }}</NuxtLink>
        <div>
            <p>Owner: {{ sharedList.owner }}</p>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        sharedList: {
            default: () => ({}),
            type: Object,
        },
    },
};
</script>
