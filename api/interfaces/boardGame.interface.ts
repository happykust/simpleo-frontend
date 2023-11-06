/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {UUID} from "crypto";
import {Auditable} from "~/api/interfaces/global.interface";

export interface IBoardGame extends Auditable {
    id: UUID,
    name: string,
    count: number,
    image_uri: string | null,
    left_count: number,
    available: boolean
}

export interface IMyBoardGameReserve {
    board_game: IBoardGame,
    completed: boolean,
    created_at: Date,
    updated_at: Date | null
}

export interface IBoardGameCreate {
    name: string
    count: number
    image: File
}

export interface IBoardGameTakeAndPutRequest {
    id: UUID
}

export interface IBoardGameTakeAndPutResponse {
    success: boolean
}
