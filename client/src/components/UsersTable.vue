<script setup lang="ts">
import { XMarkIcon, CheckIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="relative lg:w-2/3 overflow-x-auto rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Nom / Email</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="x in 5"
          :key="x"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
          >
            <img
              class="w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
              alt="Jese image"
            />
            <div class="pl-3">
              <div class="text-base font-semibold">Neil Sims</div>
              <div class="font-normal text-gray-500">
                neil.sims@giftlist.com
              </div>
            </div>
          </th>
          <td class="px-6 py-4">
            <button
              class="text-gray-800 dark:text-white hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 mr-2 lg:cursor-pointer dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <XMarkIcon v-if="x % 2 == 0" class="w-5 text-red-600" />
              <CheckIcon v-else class="w-5 text-green-600" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
