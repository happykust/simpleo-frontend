/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import { IUser } from "./auth.interface";

export enum IBookingTarget {
    "DEVICE" = "Копуктер",
    "BOARDGAME" = "Настольная игра"
}

export interface IBooking {
    id: string,
    date: string,
    time: string,
    status: string,
    created_at: string,
}