/*
 * Copyright (C) Simpleo - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {INews} from "~/api/interfaces/news.interface";

export interface INewsStore {
    news: INews[] | null,
    error: string | null,
    loading: boolean
}