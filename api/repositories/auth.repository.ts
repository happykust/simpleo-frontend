/*
 * Copyright (C) Simpleo - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by happykust - Kirill Nikolaevskiy <happykust@list.ru>, 2023
 */

import {
  IAuthTokens,
  ILoginCredentials,
  IRefreshTokensData,
  IRegisterCredentials,
  IUser
} from "~/api/interfaces/auth.interface";
import useAuthedFetch from "~/addons/useAuthedFetch";

export default {
  async auth(credentials: ILoginCredentials) {
    return useFetch<IAuthTokens>("/auth/login", {
      baseURL: useRuntimeConfig().public.baseURL,
      method: "POST",
      headers: {"ngrok-skip-browser-warning": "1"},
      body: credentials,
    })
  },
  async register(credentials: IRegisterCredentials) {
    return useFetch<IAuthTokens>("/auth/register", {
      baseURL: useRuntimeConfig().public.baseURL,
      method: "POST",
      headers: {"ngrok-skip-browser-warning": "1"},
      body: credentials,
    })
  },
  async logout(refreshTokensData: IRefreshTokensData) {
    const {data, error} = await useFetch("/auth/logout", {
      baseURL: useRuntimeConfig().public.baseURL,
      method: "POST",
      headers: {"ngrok-skip-browser-warning": "1"},
      body: refreshTokensData
    })
    return {data, error}
  },
  async getMe() {
    return await useAuthedFetch<IUser>("/auth/me", {
      method: "GET",
      headers: {"ngrok-skip-browser-warning": "1"},
      retry: 10,
    }).then((data) => {
      return {data, error: null}
    }).catch((error) => {
      return {data: null, error}
    });
  }
}