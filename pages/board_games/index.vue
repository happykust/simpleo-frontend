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
  <div class="border-b border-gray-700 max-w-[600px] sm:grid sm:grid-cols-1 pb-4 md:flex md:gap-6 md:align-middle">
    <h1 class="text-2xl font-bold mb-3 xl:justify-self-start md:justify-self-center">Настольные игры</h1>
    <button data-modal-target="take-board_game-modal" data-modal-toggle="take-board_game-modal" type="button" class="xl:justify-self-start md:justify-self-center border border-green-500 bg-green-700 text-white text-xs font-bold rounded p-2.5 mb-2">Сканировать QR-код</button>
  </div>
  <div class="grid grid-cols-1 gap-y-5 mt-5" v-if="!boardGameStore.error && !boardGameStore.loading">
    <h1 class="text-xl font-bold">История игр:</h1>
    <div v-if="boardGameStore.myReserves" v-for="board_game in boardGameStore.myReserves.reverse()" class="p-3 flex max-w-[600px] rounded border border-gray-500 border-2">
      <S3Image v-if="board_game.board_game.image_uri" :src="board_game.board_game.image_uri" :alt="board_game.board_game.name" class="w-28"/>
      <div class="ml-3">
        <p class="my-1 text-xl font-bold">{{ board_game.board_game.name }}</p>
        <p class="my-1 text-xs font-bold text-sky-700">Дата и время взятия: {{ new Date(board_game.created_at).toLocaleString() }}</p>
        <p class="my-1 text-xs font-bold text-green-500" v-if="board_game.completed">Дата и время сдачи: {{ new Date(board_game.updated_at).toLocaleString() }}</p>
        <button v-if="!board_game.completed" type="button" class="border border-sky-400 bg-sky-600 text-white text-xs font-bold rounded p-2.5 mb-2">Сдать игру</button>
      </div>
    </div>
    <div v-else>
      <h1 class="text-xs font-bold">У вас не было резерваций игр</h1>
    </div>
  </div>
  <div v-else class="mt-4 grid grid-cols-1">
    <Spinner class="justify-self-center"/>
  </div>

  <TakeBoardGameModal />

</template>

<script>
import {useBoardGameStore} from "~/stores/boardGameStore";
import Spinner from "~/components/utils/Spinner.vue";
import TakeBoardGameModal from "~/components/modals/TakeBoardGameModal.vue";
import S3Image from "~/components/shared/S3Image.vue";

export default {
  name: "index",
  components: {S3Image, TakeBoardGameModal, Spinner},
  setup() {
      const boardGameStore = useBoardGameStore();

      return {boardGameStore}
  },
  async mounted() {
    await useBoardGameStore().GetMyReserves();
  }
}
</script>
