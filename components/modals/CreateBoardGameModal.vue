<!--
  - Copyright (C) Cyberzone - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
  <!-- Create board game modal -->
  <div id="create-board_game-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)]">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Добавить игру
          </h3>
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="create-board_game-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Закрыть</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6 grid grid-cols-1">
          <form ref="form" enctype="multipart/form-data">
            <div class="mb-6">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
              <input v-model="form_data.name" name="name" type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Монороллия" required>
            </div>
            <div class="mb-6">
              <label for="count" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Количество</label>
              <input v-model="form_data.count" name="count" type="number" min="0" id="count" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required>
            </div>
            <div class="flex items-center justify-center w-full">
              <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Нажмите для загрузка</span> или перетащите</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
                </div>
                <input ref="file" id="dropzone-file" type="file" class="hidden" name="file"/>
              </label>
            </div>
          </form>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button data-modal-hide="create-board_game-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Отменить</button>
          <button :disabled="!isFormFull" @click="addBoardGame" type="button" class="text-white bg-green-500 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Создать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "~/components/utils/Spinner.vue";
import repositories from "~/api/repositories";
import {useBoardGameStore} from "~/stores/boardGameStore";
import {initFlowbite} from "flowbite";

export default {
  components: {Spinner},
  computed: {
    isFormFull() {
      return this.form_data.name.replaceAll(" ", "").length > 1 && this.form_data.count > 0;
    }
  },
  methods: {
    async addBoardGame() {
      const boardGameStore = useBoardGameStore();
      this.loading = true;

      console.log(new FormData(this.$refs.form));

      const {
        _, error
      } = await repositories.board_game.createBoardGame(new FormData(this.$refs.form))

      if (error != null) {
        console.log("ERROR:", error);
      } else {
        await boardGameStore.GetBoardGames();
      }

      this.loading = false;
    },
    setImage() {
      
    }
  },
  data() {
    return {
      loading: false,
      form_data: {
        name: "",
        count: 0,
        image: this.$refs.file?.files[0].name
      }
    }
  },
  updated() {
    initFlowbite();
  }
}
</script>
