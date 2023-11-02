/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {IBoardGame, IMyBoardGameReserve} from "~/api/interfaces/boardGame.interface";

export interface IBoardGameStore {
    myReserves: IMyBoardGameReserve[] | null,
    boardGames: IBoardGame[] | null,
    error: string | null,
    loading: boolean
}