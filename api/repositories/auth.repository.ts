/*
 * Copyright (C) Cyberzone MIREA, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import {IAuthTokens, ILoginCredentials, IRefreshTokensData} from "~/api/interfaces/auth.interface";
import useAuthedFetch from "~/addons/useAuthedFetch";
import {IEmployeeState} from "~/stores/interfaces/IAuthStore";

export default {
  async auth(credentials: ILoginCredentials) {
    return useFetch<IAuthTokens>("/auth/login", {
        baseURL: useRuntimeConfig().public.baseURL,
        method: "POST",
        body: credentials,
      })
  },
  async logout(refreshTokensData: IRefreshTokensData) {
    const {data, error} = await useFetch("/login/logout", {
      baseURL: useRuntimeConfig().public.baseURL,
      method: "POST",
      body: refreshTokensData
    })
    return {data, error}
  },
  async getMe() {
    return await useAuthedFetch<IEmployeeState>("/users/me", {
      method: "GET",
      retry: 10,
    }).then((data) => {
      let aggregatedPermissions: string[][] = [];
      data.roles.forEach((role) => {
        data.aggregated_roles.push(role.name);
        aggregatedPermissions.push(role.permissions.map(permission => permission.name))
      });
      data.aggregated_permissions = aggregatedPermissions.flat();
      return {data, error: null}
    }).catch((error) => {
      return {data: null, error}
    });
  }
}