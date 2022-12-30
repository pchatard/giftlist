<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

export interface DropdownButtonOption {
  name: string;
  path?: string;
  callback?: Function;
}

export interface DropdownButtonProps {
  text: string;
  options: Array<DropdownButtonOption>;
}

export interface DropdownButtonEmits {
  (e: "select", option: DropdownButtonOption): void;
}

defineProps<DropdownButtonProps>();
const emit = defineEmits<DropdownButtonEmits>();

const isDropdownMenuOpened = ref(false);
const toggleDropdownMenu = () => {
  isDropdownMenuOpened.value = !isDropdownMenuOpened.value;
};

const handleOptionClick = (option: DropdownButtonOption) => {
  emit("select", option);
  toggleDropdownMenu();
};

let eventListenerCloseFunction: (e: MouseEvent) => void;

onMounted(() => {
  eventListenerCloseFunction = (e) => {
    const button = document.getElementById("dropdown-button-giftlist");

    if (e.target !== button) {
      isDropdownMenuOpened.value = false;
    }
  };

  document.addEventListener("click", eventListenerCloseFunction);
});

onUnmounted(() => {
  document.removeEventListener("click", eventListenerCloseFunction);
});
</script>

<template>
  <div class="relative">
    <button
      id="dropdown-button-giftlist"
      data-dropdown-toggle="dropdown"
      class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      type="button"
      @click="toggleDropdownMenu"
    >
      {{ text }}
      <svg
        class="ml-2 w-4 h-4"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>
    <!-- Dropdown menu -->
    <div
      id="dropdown-options-giftlist"
      class="absolute right-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
      :class="isDropdownMenuOpened ? '' : 'hidden'"
    >
      <ul
        class="py-1 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefault"
      >
        <li
          v-for="option in options"
          :key="option.name"
          class="block py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          @click="handleOptionClick(option)"
        >
          {{ option.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
