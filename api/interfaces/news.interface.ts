/*
 * Copyright (C) Simpleo - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {IAuditable} from "~/api/interfaces/global.interface";
import {UUID} from "crypto";

export interface INews extends IAuditable {
    title: string,
    content: string
}

export interface INewsCreate {
    title: string,
    content: string
}

export interface INewsDeleteResponse {
    id: UUID
}