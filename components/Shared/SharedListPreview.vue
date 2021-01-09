<template>
    <li class="list-preview">
        <div class="preview">
            <div class="preview__sharing">
                <NuxtLink :to="link">
                    <h3>
                        {{ sharedList.name }}
                    </h3>
                </NuxtLink>
                <span>by {{ sharedList.owner }}</span>
            </div>
            <div class="preview__info">
                <OptionsIcon
                    cursor="pointer"
                    :options="showOptions ? '#78C3FB' : 'white'"
                    @open="toggleOptions"
                />
                <SharedListOptionsBubble
                    v-show="showOptions"
                    @close="toggleOptions"
                />
                <!-- @delete="removeSharedList" @info="toggleInfo"
                     -->
            </div>
        </div>
        <NuxtLink :to="link" tag="button" class="btn-list-link">
            Choose your gift
        </NuxtLink>
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
    data() {
        return {
            showOptions: false,
        };
    },
    computed: {
        link() {
            return `/app/lists/shared/${this.sharedList.sharingCode}`;
        },
    },
    methods: {
        toggleOptions() {
            this.showOptions = !this.showOptions;
        },
    },
};
</script>
