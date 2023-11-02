/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import useAuthedFetch from "~/addons/useAuthedFetch";
import {
    IBoardGame,
    IBoardGameTakeAndPutRequest,
    IBoardGameTakeAndPutResponse,
    IMyBoardGameReserve
} from "~/api/interfaces/boardGame.interface";
import {UUID} from "crypto";

export default {
    async getMyReserves() {
        return useAuthedFetch<IMyBoardGameReserve[]>("/board_game/reserve/my", {
            baseURL: useRuntimeConfig().public.baseURL,
            method: "GET",
            headers: {"ngrok-skip-browser-warning": "1"},
            retry: 10,
        }).then((data: IMyBoardGameReserve[]) => {
            return {data, error: null}
        }).catch((error) => {
            return {data: null, error}
        });
    },
    async takeBoardGame<IBoardGameTakeAndPutResponse>(data: IBoardGameTakeAndPutRequest) {
        return useAuthedFetch<IBoardGameTakeAndPutResponse>("/board_game/reserve/qr", {
            baseURL: useRuntimeConfig().public.baseURL,
            method: "POST",
            headers: {"ngrok-skip-browser-warning": "1"},
            body: data
        }).then((data: IBoardGameTakeAndPutResponse) => {
            return {data, error: null}
        }).catch((error) => {
            return {data: null, error}
        });
    },
    async putBoardGame<IBoardGameTakeAndPutResponse>(data: IBoardGameTakeAndPutRequest) {
        return useAuthedFetch<IBoardGameTakeAndPutResponse>("/board_game/reserve/qr", {
            baseURL: useRuntimeConfig().public.baseURL,
            method: "PUT",
            headers: {"ngrok-skip-browser-warning": "1"},
            body: data
        }).then((data: IBoardGameTakeAndPutResponse) => {
            return {data, error: null}
        }).catch((error) => {
            return {data: null, error}
        });
    },
    async getBoardGame<IBoardGame>(board_game_uuid: UUID) {
        return useAuthedFetch<IBoardGame>(`/board_game/${board_game_uuid}`, {
            baseURL: useRuntimeConfig().public.baseURL,
            method: "GET",
            headers: {"ngrok-skip-browser-warning": "1"},
        }).then((data: IBoardGame) => {
            return {data, error: null}
        }).catch((error) => {
            return {data: null, error}
        });
    }
}