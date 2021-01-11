<template>
    <li class="list-preview">
        <div class="preview">
            <NuxtLink :to="`/app/lists/${list.id}`">
                <h3>{{ list.name }}</h3>
            </NuxtLink>
            <div class="preview__info">
                <div class="shared">
                    <SharedIcon
                        v-show="list.sharingCode"
                        class="shared"
                        @show="toggleShareInfo"
                        @hide="toggleShareInfo"
                    />
                    <ListShareBubble
                        v-show="showShareInfo"
                        :number="sharedNumber"
                    />
                </div>
                <div class="options">
                    <OptionsIcon
                        :options="showOptions ? '#78C3FB' : 'white'"
                        @open="toggleOptions"
                    />
                    <ListOptionsBubble
                        v-show="showOptions"
                        @close="toggleOptions"
                        @edit="toggleEditMode"
                        @share="toggleSharingMode"
                        @delete="$emit('remove', list.id)"
                    />
                </div>
            </div>
        </div>

        <NuxtLink
            :to="`/app/lists/${list.id}`"
            tag="button"
            class="btn btn-list btn-full"
        >
            Add new gift ideas
        </NuxtLink>

        <ListEditorModal
            v-show="editMode"
            :list-name="list.name"
            @close="toggleEditMode"
            @update="updateList"
        />
        <ListShareModal
            v-show="sharingMode"
            :list-id="list.id"
            :sharing-code="list.sharingCode"
            @generate="generateSharingCode"
            @private="makeListPrivate"
            @close="toggleSharingMode"
        />
    </li>
</template>

<script>
export default {
    props: {
        list: {
            default: () => ({}),
            type: Object,
        },
    },
    data() {
        return {
            showShareInfo: false,
            showOptions: false,
            editMode: false,
            sharingMode: false,
        };
    },
    computed: {
        sharedNumber() {
            return this.list.sharedWith ? this.list.sharedWith.length : 0;
        },
    },
    methods: {
        toggleShareInfo() {
            this.showShareInfo = !this.showShareInfo;
        },
        toggleOptions() {
            this.showOptions = !this.showOptions;
        },
        toggleEditMode() {
            this.editMode = !this.editMode;
            if (this.showOptions) {
                this.toggleOptions();
            }
        },
        updateList(newName) {
            this.$emit('update', { name: newName, id: this.list.id });
            this.toggleEditMode();
        },
        toggleSharingMode() {
            this.sharingMode = !this.sharingMode;
            if (this.showOptions) {
                this.toggleOptions();
            }
        },
        generateSharingCode(listId) {
            this.$emit('share', listId);
        },
        makeListPrivate(listId) {
            this.$emit('private', listId);
        },
    },
};
</script>
