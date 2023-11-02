<!--
  - Copyright (C) Cyberzone - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
  <!-- Main modal -->
  <div id="take-board_game-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)]">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Отсканируйте QR-код
          </h3>
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="take-board_game-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 py-20 space-y-6 grid grid-cols-1">
          <p class="text-xl font-bold justify-self-center text-indigo-600" v-if="!loading">{{ status }}</p>
          <Spinner v-else />
          <StreamBarcodeReader class="w-72 justify-self-center" @decode="onDecode" v-if="!loaded_board_game" />
          <div v-else class="grid grid-cols-1">
            <img class="w-72 justify-self-center mb-5" :src="loaded_board_game.image_url" :alt="loaded_board_game.title">
            <h1 class="text-xl font-bold justify-self-center mb-3">{{ loaded_board_game.title }}</h1>
            <p class="justify-self-center">{{ loaded_board_game.description }}</p>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button data-modal-hide="take-board_game-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Отменить</button>
          <button v-if="loaded_board_game" type="button" class="text-white bg-green-500 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Взять</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { StreamBarcodeReader } from "vue-barcode-reader";
import Spinner from "~/components/utils/Spinner.vue";
</script>

<script>
import { validate as uuidValidate } from "uuid";
import repositories from "~/api/repositories";

export default {
  methods: {
    async onDecode(qrData) {
      this.loading = true;

      if (!uuidValidate(qrData)) {
        this.status = "Странный QR код... Хм, не подходит";
        this.loading = false;
        return null;
      }

      const {data, error} = await repositories.board_game.getBoardGame(qrData);

      if (data == null && error === undefined) {
        this.status = "Мы не нашли эту настлоку, давай другую";
        this.loading = false;
        return null;
      }

      this.loaded_board_game = data;
    }
  },
  data() {
    return {
      status: "Ждём QR код...",
      loading: false,
      loaded_board_game: null,
    }
  },
}
</script>

<style scoped>

</style>