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
                    options="white"
                    @open="toggleOptions"
                />
            </div>
        </div>
        <NuxtLink :to="link" tag="button" class="btn btn-list btn-full">
            Consulter
        </NuxtLink>
        <SharedListInfoModal
            v-show="showInfo"
            :list="sharedList"
            @close="toggleInfo"
        />
        <SharedListOptionsModal
            v-show="showOptions"
            @close="toggleOptions"
            @info="toggleInfo"
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
            if (this.showOptions) {
                this.toggleOptions();
            }
            this.showInfo = !this.showInfo;
        },
    },
};
</script>
