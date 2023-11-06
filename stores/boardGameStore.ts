/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {defineStore} from "pinia";
import {IBoardGameStore} from "~/stores/interfaces/IBoardGameStore";
import repositories from "~/api/repositories";
import {IBoardGame} from "~/api/interfaces/boardGame.interface";
import {UUID} from "crypto";

const BoardGameRepository = repositories.board_game;

export const useBoardGameStore = defineStore('board_game', {
  state: (): IBoardGameStore => ({
    myReserves: null,
    boardGames: null,
    showQRCodeBoardGameID: null,
    error: null,
    loading: false,
  }),

  getters: {
    getShowQRCodeBoardGame: (state) =>
      <IBoardGame>(state.boardGames?.find(boardGame => boardGame.id === state.showQRCodeBoardGameID))
  },

  actions: {
    setBoardGameToShowQR(boardGameUUID: UUID) {
      this.showQRCodeBoardGameID = boardGameUUID;
    },
    async GetMyReserves() {
      this.error = null;
      this.loading = true;
      const {data, error} = await BoardGameRepository.getMyReserves();

      if (error != null) {
        this.error = error;
      }

      this.myReserves = data;
      this.loading = false;
    },
    async GetBoardGames() {
      this.error = null;
      this.loading = true;
      const {data, error} = await BoardGameRepository.getBoardGames();

      if (error != null) {
        this.error = error;
      }

      this.boardGames = data;
      this.loading = false;
    }
  }
})