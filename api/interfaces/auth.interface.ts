/*
 * Copyright (C) Simpleo - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {UUID} from "crypto";
import {IAuditable} from "~/api/interfaces/global.interface";

export interface ILoginCredentials {
    username: string,
    password: string
}

export interface IRegisterCredentials {
    username: string,
    password: string,
    email: string,
}

export interface IAuthTokens {
    access_token: string,
    refresh_token: string,
}

export interface IRefreshTokensData {
    refresh_token: string,
}

export interface IUser extends IAuditable {
    username: string,
    email: string
}
