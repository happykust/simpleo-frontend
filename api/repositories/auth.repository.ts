/*
 * Copyright (C) Cyberzone - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {IAuthTokens, ILoginCredentials, IRefreshTokensData, IUser} from "~/api/interfaces/auth.interface";
import useAuthedFetch from "~/addons/useAuthedFetch";

export default {
  async auth(credentials: ILoginCredentials) {
    return useFetch<IAuthTokens>("/auth/login", {
        baseURL: useRuntimeConfig().public.baseURL,
        method: "POST",
        body: credentials,
      })
  },
  async logout(refreshTokensData: IRefreshTokensData) {
    const {data, error} = await useFetch("/auth/logout", {
      baseURL: useRuntimeConfig().public.baseURL,
      method: "POST",
      body: refreshTokensData
    })
    return {data, error}
  },
  async getMe() {
    return await useAuthedFetch<IUser>("/auth/me", {
      method: "GET",
      retry: 10,
    }).then((data) => {
      return {data, error: null}
    }).catch((error) => {
      return {data: null, error}
    });
  }
}