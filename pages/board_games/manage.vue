<!--
  - Copyright (C) Cyberzone - All Rights Reserved
  - Unauthorized copying of this file, via any medium is strictly prohibited
  - Proprietary and confidential
  - Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
  -->

<template>
  <Head>
    <Title>Настольные игры | Cyberzone CP</Title>
  </Head>
  <h1 class="font-bold text-xl">Список настольных игр</h1>
  <section class="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
    <div class="max-w-screen-xl">
      <!-- Start coding here -->
      <div v-if="!boardGameStore.loading && boardGameStore.boardGames !== null"
           class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden min-h-50">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="w-full md:w-1/2">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">Поиск по названию</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Поиск по названию" required="">
              </div>
            </form>
          </div>
          <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button data-modal-target="create-board_game-modal" data-modal-toggle="create-board_game-modal" type="button" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
              Добавить игру
            </button>
            <button type="button" class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
              Печать
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">Фото</th>
              <th scope="col" class="px-4 py-3">Название</th>
              <th scope="col" class="px-4 py-3">Кол-во всего</th>
              <th scope="col" class="px-4 py-3">Осталось</th>
              <th scope="col" class="px-4 py-3">Можно взять?</th>
              <th scope="col" class="px-4 py-3">Изменено</th>
              <th scope="col" class="px-4 py-3">Создано</th>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Действия</span>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr class="border-b dark:border-gray-700" v-for="board_game in boardGameStore.boardGames">
              <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <S3Image :src="board_game.image_uri" :alt="board_game.name" v-if="board_game.image_uri" class="w-28"/>
              </th>
              <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ board_game.name }}</th>
              <td class="px-4 py-3">{{ board_game.count }}</td>
              <td class="px-4 py-3">{{ board_game.left_count }}</td>
              <td class="px-4 py-3">{{ board_game.available?"Да":"Нет" }}</td>
              <td class="px-4 py-3">{{ board_game.updated_at?new Date(board_game.updated_at).toLocaleString():"Не изменялась" }}</td>
              <td class="px-4 py-3">{{ new Date(board_game.created_at).toLocaleString() }}</td>
              <td class="px-4 py-3 flex items-center justify-end">
                <button :id="`${board_game.id}-dropdown-button`" :data-dropdown-toggle="`${board_game.id}-dropdown`" class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                  <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                <div :id="`${board_game.id}-dropdown`" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                  <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" :aria-labelledby="`${board_game.id}-dropdown-button`">
                    <li>
                      <a href="#" data-modal-target="view-qr-board_game-modal" data-modal-toggle="view-qr-board_game-modal" @click="selectBoardGameToShowQR(board_game.id)" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Показать QR-код</a>
                    </li>
                    <li>
                      <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Изменить</a>
                    </li>
                    <li>
                      <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600 dark:hover:text-red-600">Удалить</a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Spinner v-if="boardGameStore.loading" />
    </div>
  </section>

  <CreateBoardGameModal />
  <ViewQRCodeBoardGameModal />

</template>

<script>
import {useBoardGameStore} from "~/stores/boardGameStore";
import {initFlowbite} from "flowbite";
import Spinner from "~/components/utils/Spinner.vue";
import CreateBoardGameModal from "~/components/modals/CreateBoardGameModal.vue";
import ViewQRCodeBoardGameModal from "~/components/modals/ViewQRCodeBoardGameModal.vue";
import S3Image from "~/components/shared/S3Image.vue";

export default {
  components: {S3Image, ViewQRCodeBoardGameModal, CreateBoardGameModal, Spinner},
  setup() {
    const boardGameStore = useBoardGameStore();

    return {boardGameStore}
  },
  async mounted() {
    await useBoardGameStore().GetBoardGames();
    initFlowbite();
  },
  methods: {
    selectBoardGameToShowQR(boardGameUUID) {
      this.boardGameStore.setBoardGameToShowQR(boardGameUUID);
    }
  }
}
</script>