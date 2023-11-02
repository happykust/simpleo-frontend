/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {defineStore} from "pinia";
import {IBoardGameStore} from "~/stores/interfaces/IBoardGameStore";
import repositories from "~/api/repositories";

const BoardGameRepository = repositories.board_game;

export const useBoardGameStore = defineStore('board_game', {
  state: (): IBoardGameStore => ({
    myReserves: null,
    error: null,
    loading: false,
  }),

  actions: {
    async GetMyReserves() {
      this.error = null;
      this.loading = true;
      const {data, error} = await BoardGameRepository.getMyReserves();

      if (error != null) {
        this.error = error;
      }

      this.myReserves = data;
      this.loading = false;
    }
  }
})