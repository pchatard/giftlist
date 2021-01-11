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
                    @info="toggleInfo"
                />
                <!-- @delete="removeSharedList" 
                     -->
            </div>
        </div>
        <NuxtLink :to="link" tag="button" class="btn btn-list btn-full">
            Choose your gift
        </NuxtLink>
        <SharedListInfoModal
            v-show="showInfo"
            :list="sharedList"
            @close="toggleInfo"
        />
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
            showInfo: false,
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
        toggleInfo() {
            this.showInfo = !this.showInfo;
        },
    },
};
</script>
